import { Link, useNavigate } from 'react-router-dom'

import type { Disk } from '@oxide/api'
import { useApiMutation, useApiQueryClient } from '@oxide/api'
import { useApiQuery } from '@oxide/api'
import type { MenuAction } from '@oxide/table'
import { DateCell } from '@oxide/table'
import { SizeCell } from '@oxide/table'
import { useQueryTable } from '@oxide/table'
import {
  EmptyMessage,
  PageHeader,
  PageTitle,
  Storage24Icon,
  TableActions,
  buttonStyle,
} from '@oxide/ui'

import { DiskStatusBadge } from 'app/components/StatusBadge'
import CreateDiskSideModalForm from 'app/forms/disk-create'
import { useRequiredParams } from 'app/hooks'

function AttachedInstance(props: {
  orgName: string
  projectName: string
  instanceId: string
}) {
  const { data: instance } = useApiQuery('instanceViewById', { id: props.instanceId })
  return instance ? (
    <Link
      className="text-sans-semi-md text-accent hover:underline"
      to={`../instances/${instance.name}`}
    >
      {instance.name}
    </Link>
  ) : null
}

const EmptyState = () => (
  <EmptyMessage
    icon={<Storage24Icon />}
    title="No disks"
    body="You need to create a disk to be able to see it here"
    buttonText="New disk"
    buttonTo="new"
  />
)

interface DisksPageProps {
  modal?: 'createDisk'
}

export function DisksPage({ modal }: DisksPageProps) {
  const navigate = useNavigate()

  const queryClient = useApiQueryClient()
  const { orgName, projectName } = useRequiredParams('orgName', 'projectName')
  const { Table, Column } = useQueryTable('diskList', { orgName, projectName })

  const deleteDisk = useApiMutation('diskDelete', {
    onSuccess() {
      queryClient.invalidateQueries('diskList', { orgName, projectName })
    },
  })

  const makeActions = (disk: Disk): MenuAction[] => [
    {
      label: 'Delete',
      onActivate: () => {
        deleteDisk.mutate({ orgName, projectName, diskName: disk.name })
      },
      disabled: !['detached', 'creating', 'faulted'].includes(disk.state.state),
    },
  ]

  return (
    <>
      <PageHeader>
        <PageTitle icon={<Storage24Icon />}>Disks</PageTitle>
      </PageHeader>
      <TableActions>
        <Link to="new" className={buttonStyle({ size: 'xs', variant: 'default' })}>
          New Disk
        </Link>
      </TableActions>
      <Table emptyState={<EmptyState />} makeActions={makeActions}>
        <Column accessor="name" header="Disk" />
        {/* TODO: show info about the instance it's attached to */}
        <Column
          id="attached-to"
          header="Attached To"
          accessor={(disk) =>
            // sneaky: rather than looking at particular states, just look at
            // whether it has an instance field
            'instance' in disk.state ? disk.state.instance : null
          }
          cell={({ value }: { value: string | undefined }) =>
            value ? (
              <AttachedInstance
                orgName={orgName}
                projectName={projectName}
                instanceId={value}
              />
            ) : null
          }
        />
        <Column header="Size" accessor="size" cell={SizeCell} />
        <Column
          id="status"
          accessor={(row) => row.state.state}
          cell={({ value }) => <DiskStatusBadge status={value} />}
        />
        <Column header="Created" accessor="timeCreated" cell={DateCell} />
      </Table>
      <CreateDiskSideModalForm
        isOpen={modal === 'createDisk'}
        onDismiss={() => navigate('..')}
      />
    </>
  )
}
