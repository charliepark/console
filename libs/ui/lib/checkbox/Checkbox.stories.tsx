import React from 'react'
import type { Story } from '@storybook/react'
import { Checkbox } from './Checkbox'

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
}

type Props = React.ComponentProps<typeof Checkbox>

const Template: Story<Props> = (args) => <Checkbox {...args} />

export const Unchecked: Story<Props> = Template.bind({})
Unchecked.args = { checked: false, indeterminate: false }

export const Checked: Story<Props> = Template.bind({})
Checked.args = { checked: true, indeterminate: false }

export const Indeterminate: Story<Props> = Template.bind({})
Indeterminate.args = { checked: false, indeterminate: true }
