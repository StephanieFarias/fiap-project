import React from 'react';

import { Story, Meta } from '@storybook/react';

import { SubTitle,SubTitleProps } from './';


export default {
  component: SubTitle,
  title: 'Components/SubTitle',
} as Meta;

const Template: Story<SubTitleProps> = (args) => (
  <SubTitle  {...args}/>
);

export const Default = Template.bind({});

Default.args = {
    text:"Sub titulo",
    color: "primary"
};