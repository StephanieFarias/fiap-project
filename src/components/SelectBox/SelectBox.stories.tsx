import React from 'react';

import { Story, Meta } from '@storybook/react';

import { ISelectBoxProps, SelectBox} from './';
import { IOption } from '../../types/IOption';

export default {
  component: SelectBox,
  title: 'Components/SelectBox',
} as Meta;

const genders = [
    "Feminino",
    "Masculino"
];

const Template: Story<ISelectBoxProps> = (args) => (
        <SelectBox {...args} />
);



export const Default = Template.bind({});

Default.args = {
    options: genders.map((gender) => ({
        label: gender,
        value: gender,
    })),
    value: {} as IOption,
    isDisabled: false,
    field: "gender",
    setFieldValue: (field, value) => {},
    onComplete:() => {},
    isClearable: false,
};

