import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Search } from './';


export default {
  component: Search,
  title: 'Components/Search',
} as Meta;

const Template: Story = () => (
  <Search  />
);

export const Default = Template.bind({});

Default.args = {};