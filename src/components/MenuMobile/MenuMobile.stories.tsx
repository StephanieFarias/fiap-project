import React from 'react';

import { Story, Meta } from '@storybook/react';

import { MenuMobile } from './';


export default {
  component: MenuMobile,
  title: 'Components/MenuMobile',
} as Meta;

const Template: Story = () => (
  <MenuMobile />
);

export const Default = Template.bind({});
