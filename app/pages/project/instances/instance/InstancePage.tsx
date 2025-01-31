/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { format } from 'date-fns'
import filesize from 'filesize'
import { useMemo } from 'react'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { apiQueryClient, useApiQueryClient, usePrefetchedApiQuery } from '@oxide/api'
import {
  Instances24Icon,
  PageHeader,
  PageTitle,
  PropertiesTable,
  Truncate,
} from '@oxide/ui'

import { MoreActionsMenu } from 'app/components/MoreActionsMenu'
import { RouteTabs, Tab } from 'app/components/RouteTabs'
import { InstanceStatusBadge } from 'app/components/StatusBadge'
import { getInstanceSelector, useInstanceSelector, useQuickActions } from 'app/hooks'
import { pb } from 'app/util/path-builder'

import { useMakeInstanceActions } from '../actions'

InstancePage.loader = async ({ params }: LoaderFunctionArgs) => {
  const { project, instance } = getInstanceSelector(params)
  await apiQueryClient.prefetchQuery('instanceView', {
    path: { instance },
    query: { project },
  })
  return null
}

export function InstancePage() {
  const instanceSelector = useInstanceSelector()

  const navigate = useNavigate()
  const queryClient = useApiQueryClient()
  const makeActions = useMakeInstanceActions(instanceSelector, {
    onSuccess: () => {
      queryClient.invalidateQueries('instanceView')
    },
    // go to project instances list since there's no more instance
    onDelete: () => navigate(pb.instances(instanceSelector)),
  })

  const { data: instance } = usePrefetchedApiQuery('instanceView', {
    path: { instance: instanceSelector.instance },
    query: { project: instanceSelector.project },
  })

  const actions = useMemo(
    () => [
      {
        label: 'Copy ID',
        onActivate() {
          window.navigator.clipboard.writeText(instance.id || '')
        },
      },
      ...makeActions(instance),
    ],
    [instance, makeActions]
  )
  const quickActions = useMemo(
    () =>
      actions
        // in the quick menu we do not show disabled actions
        .filter((a) => !a.disabled)
        // append "instance" to labels
        // TODO: if these were in an "Instance actions" subsection they might not
        // need the suffix for clarity
        .map((a) => ({ onSelect: a.onActivate, value: a.label })),
    [actions]
  )
  useQuickActions(quickActions)

  const memory = filesize(instance.memory, { output: 'object', base: 2 })

  return (
    <>
      <PageHeader>
        <PageTitle icon={<Instances24Icon />}>{instance.name}</PageTitle>
        <MoreActionsMenu label="Instance actions" actions={actions} />
      </PageHeader>
      <PropertiesTable.Group className="-mt-8 mb-16">
        <PropertiesTable>
          <PropertiesTable.Row label="cpu">
            <span className="text-secondary">{instance.ncpus}</span>
            <span className="ml-1 text-quaternary"> vCPUs</span>
          </PropertiesTable.Row>
          <PropertiesTable.Row label="ram">
            <span className="text-secondary">{memory.value}</span>
            <span className="ml-1 text-quaternary"> {memory.unit}</span>
          </PropertiesTable.Row>
          <PropertiesTable.Row label="status">
            <InstanceStatusBadge status={instance.runState} />
          </PropertiesTable.Row>
        </PropertiesTable>
        <PropertiesTable>
          <PropertiesTable.Row label="description">
            <span className="text-secondary">
              <Truncate text={instance.description} maxLength={40} />
            </span>
          </PropertiesTable.Row>
          {/* <PropertiesTable.Row label="dns name">
            <span className="text-secondary">{instance.hostname || '–'}</span>
          </PropertiesTable.Row> */}
          <PropertiesTable.Row label="created">
            <span className="text-secondary">
              {format(instance.timeCreated, 'MMM d, yyyy')}{' '}
            </span>
            <span className="ml-1 text-quaternary">
              {format(instance.timeCreated, 'p')}
            </span>
          </PropertiesTable.Row>
          <PropertiesTable.Row label="id">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-secondary">
              {instance.id}
            </span>
          </PropertiesTable.Row>
        </PropertiesTable>
      </PropertiesTable.Group>
      <RouteTabs fullWidth>
        <Tab to={pb.instanceStorage(instanceSelector)}>Storage</Tab>
        <Tab to={pb.instanceMetrics(instanceSelector)}>Metrics</Tab>
        <Tab to={pb.nics(instanceSelector)}>Network Interfaces</Tab>
        <Tab to={pb.instanceConnect(instanceSelector)}>Connect</Tab>
      </RouteTabs>
    </>
  )
}
