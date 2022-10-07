import { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { Organization } from '@oxide/api'
import { apiQueryClient } from '@oxide/api'
import { useApiQueryClient } from '@oxide/api'
import { useApiMutation, useApiQuery } from '@oxide/api'
import type { MenuAction } from '@oxide/table'
import { DateCell, linkCell, useQueryTable } from '@oxide/table'
import {
  EmptyMessage,
  Folder24Icon,
  PageHeader,
  PageTitle,
  TableActions,
  buttonStyle,
} from '@oxide/ui'

import { CreateOrgSideModalForm } from 'app/forms/org-create'
import { EditOrgSideModalForm } from 'app/forms/org-edit'
import { pb } from 'app/util/path-builder'

import { useQuickActions } from '../hooks'

const EmptyState = () => (
  <EmptyMessage
    icon={<Folder24Icon />}
    title="No organizations"
    body="You need to create an organization to be able to see it here"
    buttonText="New organization"
    buttonTo={pb.orgNew()}
  />
)

OrgsPage.loader = async () => {
  await apiQueryClient.prefetchQuery('organizationList', { limit: 10 })
}

interface OrgsPageProps {
  modal?: 'createOrg' | 'editOrg'
}

export default function OrgsPage({ modal }: OrgsPageProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const { Table, Column } = useQueryTable('organizationList', {})
  const queryClient = useApiQueryClient()

  const { data: orgs } = useApiQuery('organizationList', {
    limit: 10, // to have same params as QueryTable
  })

  const deleteOrg = useApiMutation('organizationDelete', {
    onSuccess() {
      queryClient.invalidateQueries('organizationList', {})
    },
  })

  const makeActions = (org: Organization): MenuAction[] => [
    {
      label: 'Edit',
      onActivate() {
        navigate(pb.orgEdit({ orgName: org.name }), { state: org })
      },
    },
    {
      label: 'Delete',
      onActivate: () => {
        deleteOrg.mutate({ orgName: org.name })
      },
    },
  ]

  useQuickActions(
    useMemo(
      () => [
        { value: 'New organization', onSelect: () => navigate(pb.orgNew()) },
        ...(orgs?.items || []).map((o) => ({
          value: o.name,
          onSelect: () => navigate(pb.org({ orgName: o.name })),
          navGroup: 'Go to organization',
        })),
      ],
      [navigate, orgs]
    )
  )

  return (
    <>
      <PageHeader>
        <PageTitle icon={<Folder24Icon />}>Organizations</PageTitle>
      </PageHeader>
      <TableActions>
        <Link to={pb.orgNew()} className={buttonStyle({ variant: 'default', size: 'sm' })}>
          New Organization
        </Link>
      </TableActions>
      <Table emptyState={<EmptyState />} makeActions={makeActions}>
        <Column accessor="name" cell={linkCell((orgName) => pb.projects({ orgName }))} />
        <Column accessor="description" />
        <Column accessor="timeModified" header="Last updated" cell={DateCell} />
      </Table>
      <CreateOrgSideModalForm
        isOpen={modal === 'createOrg'}
        onDismiss={() => navigate(pb.orgs())}
      />
      <EditOrgSideModalForm
        isOpen={modal === 'editOrg'}
        onDismiss={() => navigate(pb.orgs())}
        initialValues={location.state}
      />
    </>
  )
}
