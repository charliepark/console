/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { useMemo, useState } from 'react'

import type { IdentityType, RoleKey } from '@oxide/api'
import { deleteRole, usePrefetchedApiQuery } from '@oxide/api'
import {
  apiQueryClient,
  byGroupThenName,
  getEffectiveRole,
  useApiMutation,
  useApiQueryClient,
  useUserRows,
} from '@oxide/api'
import { Table, createColumnHelper, getActionsCol, useReactTable } from '@oxide/table'
import {
  Access24Icon,
  Button,
  EmptyMessage,
  PageHeader,
  PageTitle,
  TableActions,
  TableEmptyBox,
} from '@oxide/ui'
import { groupBy, isTruthy } from '@oxide/util'

import { AccessNameCell } from 'app/components/AccessNameCell'
import { HL } from 'app/components/ConfirmDeleteModal'
import { RoleBadgeCell } from 'app/components/RoleBadgeCell'
import {
  SiloAccessAddUserSideModal,
  SiloAccessEditUserSideModal,
} from 'app/forms/silo-access'
import { confirmDelete } from 'app/stores/confirm-delete'

const EmptyState = ({ onClick }: { onClick: () => void }) => (
  <TableEmptyBox>
    <EmptyMessage
      icon={<Access24Icon />}
      title="No authorized users"
      body="Give permission to view, edit, or administer this silo"
      buttonText="Add user or group"
      onClick={onClick}
    />
  </TableEmptyBox>
)

SiloAccessPage.loader = async () => {
  await Promise.all([
    apiQueryClient.prefetchQuery('policyView', {}),
    // used to resolve user names
    apiQueryClient.prefetchQuery('userList', {}),
    apiQueryClient.prefetchQuery('groupList', {}),
  ])
  return null
}

type UserRow = {
  id: string
  identityType: IdentityType
  name: string
  siloRole: RoleKey | undefined
  effectiveRole: RoleKey
}

const colHelper = createColumnHelper<UserRow>()

export function SiloAccessPage() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingUserRow, setEditingUserRow] = useState<UserRow | null>(null)

  const { data: siloPolicy } = usePrefetchedApiQuery('policyView', {})
  const siloRows = useUserRows(siloPolicy.roleAssignments, 'silo')

  const rows = useMemo(() => {
    return groupBy(siloRows, (u) => u.id)
      .map(([userId, userAssignments]) => {
        const siloRole = userAssignments.find((a) => a.roleSource === 'silo')?.roleName

        const roles = [siloRole].filter(isTruthy)

        const { name, identityType } = userAssignments[0]

        const row: UserRow = {
          id: userId,
          identityType,
          name,
          siloRole,
          // we know there has to be at least one
          effectiveRole: getEffectiveRole(roles)!,
        }

        return row
      })
      .sort(byGroupThenName)
  }, [siloRows])

  const queryClient = useApiQueryClient()
  const updatePolicy = useApiMutation('policyUpdate', {
    onSuccess: () => queryClient.invalidateQueries('policyView'),
    // TODO: handle 403
  })

  // TODO: checkboxes and bulk delete? not sure
  // TODO: disable delete on permissions you can't delete

  const columns = useMemo(
    () => [
      colHelper.accessor('name', { header: 'Name', cell: AccessNameCell }),
      colHelper.accessor('siloRole', {
        header: 'Silo role',
        cell: RoleBadgeCell,
      }),
      // TODO: tooltips on disabled elements explaining why
      getActionsCol((row: UserRow) => [
        {
          label: 'Change role',
          onActivate: () => setEditingUserRow(row),
          disabled: !row.siloRole && "You don't have permission to change this user's role",
        },
        // TODO: only show if you have permission to do this
        {
          label: 'Delete',
          onActivate: confirmDelete({
            doDelete: () =>
              updatePolicy.mutateAsync({
                // we know policy is there, otherwise there's no row to display
                body: deleteRole(row.id, siloPolicy!),
              }),
            label: (
              <span>
                the <HL>{row.siloRole}</HL> role for <HL>{row.name}</HL>
              </span>
            ),
          }),
          disabled: !row.siloRole && "You don't have permission to delete this user",
        },
      ]),
    ],
    [siloPolicy, updatePolicy]
  )

  const tableInstance = useReactTable({ columns, data: rows })

  return (
    <>
      <PageHeader>
        <PageTitle icon={<Access24Icon />}>Access &amp; IAM</PageTitle>
      </PageHeader>

      <TableActions>
        <Button size="sm" onClick={() => setAddModalOpen(true)}>
          Add user or group
        </Button>
      </TableActions>
      {siloPolicy && addModalOpen && (
        <SiloAccessAddUserSideModal
          onDismiss={() => setAddModalOpen(false)}
          policy={siloPolicy}
        />
      )}
      {siloPolicy && editingUserRow?.siloRole && (
        <SiloAccessEditUserSideModal
          onDismiss={() => setEditingUserRow(null)}
          policy={siloPolicy}
          identityId={editingUserRow.id}
          identityType={editingUserRow.identityType}
          defaultValues={{ roleName: editingUserRow.siloRole }}
        />
      )}
      {rows.length === 0 ? (
        <EmptyState onClick={() => setAddModalOpen(true)} />
      ) : (
        <Table table={tableInstance} />
      )}
    </>
  )
}
