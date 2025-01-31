/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import type { SshKeyCreate } from '@oxide/api'
import { useApiMutation, useApiQueryClient } from '@oxide/api'

import { DescriptionField, NameField, SideModalForm, TextField } from 'app/components/form'
import { pb } from 'app/util/path-builder'

const defaultValues: SshKeyCreate = {
  name: '',
  description: '',
  publicKey: '',
}

export function CreateSSHKeySideModalForm() {
  const queryClient = useApiQueryClient()
  const navigate = useNavigate()

  const onDismiss = () => navigate(pb.sshKeys())

  const createSshKey = useApiMutation('currentUserSshKeyCreate', {
    onSuccess() {
      queryClient.invalidateQueries('currentUserSshKeyList')
      onDismiss()
    },
  })
  const form = useForm({ mode: 'all', defaultValues })

  return (
    <SideModalForm
      id="create-ssh-key-form"
      title="Add SSH key"
      form={form}
      onDismiss={onDismiss}
      onSubmit={(body) => createSshKey.mutate({ body })}
      loading={createSshKey.isPending}
      submitError={createSshKey.error}
    >
      <NameField name="name" control={form.control} />
      <DescriptionField name="description" control={form.control} />
      <TextField
        as="textarea"
        name="publicKey"
        label="Public key"
        required
        rows={8}
        control={form.control}
      />
    </SideModalForm>
  )
}
