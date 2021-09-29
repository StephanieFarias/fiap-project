import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Header } from './';


export default {
  component: Header,
  title: 'Components/Header',
} as Meta;

const Template: Story = () => (
  <Header  />
);

export const Default = Template.bind({});

Default.args = {};