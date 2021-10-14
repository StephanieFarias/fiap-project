import React from 'react';

import { Story, Meta } from '@storybook/react';

import { RadioButton, IRadioButtonProps} from './';

export default {
  component: RadioButton,
  title: 'Components/RadioButton',
} as Meta;

const Template: Story<IRadioButtonProps> = (args) => (
    <div className="flex flex-row items-center space-x-3">
        <RadioButton {...args} />
    </div>
);

export const Checked = Template.bind({});

Checked.args = {
    field: "acceptedTerms",
    isChecked: true,
    setFieldValue: (field, value) => {}
};

export const UnChecked = Template.bind({});

UnChecked.args = {
    field: "acceptedTerms",
    isChecked: false,
    setFieldValue: (field, value) => {}
};