import React from 'react';

import { Story, Meta } from '@storybook/react';

import { FormItem, FormItemProps} from './';

export default {
  component: FormItem,
  title: 'Components/FormItem',
} as Meta;

const Template: Story<FormItemProps> = (args) => (
  <FormItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: "Titulo",
  errors: "errors",
  touched: true,
  values: "values",
  field: "email",
  type: "email",
  className: "className",
  setFieldValue: (field, value) => {}
};