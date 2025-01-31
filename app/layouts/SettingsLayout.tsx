/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Divider, Folder16Icon, Key16Icon, Profile16Icon } from '@oxide/ui'

import { TopBar } from 'app/components/TopBar'
import { SiloSystemPicker } from 'app/components/TopBarPicker'
import { useQuickActions } from 'app/hooks'
import { pb } from 'app/util/path-builder'

import { DocsLinkItem, NavLinkItem, Sidebar } from '../components/Sidebar'
import { ContentPane, PageContainer } from './helpers'

const SettingsLayout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useQuickActions(
    useMemo(
      () =>
        [
          { value: 'Profile', path: pb.profile() },
          { value: 'SSH Keys', path: pb.sshKeys() },
        ]
          // filter out the entry for the path we're currently on
          .filter((i) => i.path !== pathname)
          .map((i) => ({
            navGroup: `Settings`,
            value: i.value,
            onSelect: () => navigate(i.path),
          })),
      [pathname, navigate]
    )
  )

  return (
    <PageContainer>
      <TopBar>
        <SiloSystemPicker value="silo" />
      </TopBar>
      <Sidebar>
        <Sidebar.Nav>
          <NavLinkItem to={pb.projects()}>
            <Folder16Icon /> Projects
          </NavLinkItem>
          <DocsLinkItem />
        </Sidebar.Nav>
        <Divider />
        <Sidebar.Nav heading="User">
          <NavLinkItem to={pb.profile()}>
            <Profile16Icon /> Profile
          </NavLinkItem>
          <NavLinkItem to={pb.sshKeys()}>
            <Key16Icon /> SSH Keys
          </NavLinkItem>
        </Sidebar.Nav>
      </Sidebar>
      <ContentPane />
    </PageContainer>
  )
}

export default SettingsLayout
