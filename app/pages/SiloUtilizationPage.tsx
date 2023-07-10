import { getLocalTimeZone, now } from '@internationalized/date'
import { useIsFetching } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import invariant from 'tiny-invariant'

import { apiQueryClient, useApiQuery } from '@oxide/api'
import { Divider, Listbox, PageHeader, PageTitle, Snapshots24Icon } from '@oxide/ui'
import { bytesToGiB, bytesToTiB } from '@oxide/util'

import { useIntervalPicker } from 'app/components/RefetchIntervalPicker'
import { SiloMetric } from 'app/components/SystemMetric'
import { useDateTimeRangePicker } from 'app/components/form'

const toListboxItem = (x: { name: string; id: string }) => ({ label: x.name, value: x.id })

SiloUtilizationPage.loader = async () => {
  await apiQueryClient.prefetchQuery('projectList', {})
  return null
}

export function SiloUtilizationPage() {
  // this will come from /session/me
  const { data: me } = useApiQuery('currentUserView', {})
  invariant(me, 'Current user should be prefetched')

  const siloId = me.siloId

  const { data: projects } = useApiQuery('projectList', {})

  const projectItems = useMemo(() => {
    const items = projects?.items.map(toListboxItem) || []
    return [{ label: 'All projects', value: siloId }, ...items]
  }, [projects, siloId])

  const [filterId, setFilterId] = useState<string>(siloId)

  // pass refetch interval to this to keep the date up to date
  const { preset, startTime, endTime, dateTimeRangePicker, onRangeChange } =
    useDateTimeRangePicker({
      initialPreset: 'lastHour',
      maxValue: now(getLocalTimeZone()),
    })

  const { intervalPicker } = useIntervalPicker({
    enabled: preset !== 'custom',
    isLoading: useIsFetching({ queryKey: ['siloMetric'] }) > 0,
    // sliding the range forward is sufficient to trigger a refetch
    fn: () => onRangeChange(preset),
  })

  const commonProps = {
    startTime,
    endTime,
    // the way we tell the API we want the silo is by passing no filter
    project: filterId === siloId ? undefined : filterId,
  }

  return (
    <>
      <PageHeader>
        <PageTitle icon={<Snapshots24Icon />}>Capacity &amp; Utilization</PageTitle>
      </PageHeader>

      <div className="flex justify-between gap-3">
        <Listbox
          selected={filterId}
          className="w-48"
          aria-labelledby="filter-id-label"
          name="filter-id"
          items={projectItems}
          onChange={setFilterId}
        />

        <div className="flex items-center gap-2">{dateTimeRangePicker}</div>
      </div>

      <Divider className="my-6" />

      {intervalPicker}

      <div className="mb-12 space-y-12">
        <SiloMetric
          {...commonProps}
          metricName="virtual_disk_space_provisioned"
          title="Disk Space"
          unit="TiB"
          valueTransform={bytesToTiB}
        />
        <SiloMetric
          {...commonProps}
          metricName="cpus_provisioned"
          title="CPU"
          unit="count"
        />
        <SiloMetric
          {...commonProps}
          metricName="ram_provisioned"
          title="Memory"
          unit="GiB"
          valueTransform={bytesToGiB}
        />
      </div>
    </>
  )
}
