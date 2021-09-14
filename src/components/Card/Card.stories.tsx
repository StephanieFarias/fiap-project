import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Card, CardProps} from './';
import {FiActivity} from 'react-icons/fi'

export default {
  component: Card,
  title: 'Components/Card',
} as Meta;

const Template: Story<CardProps> = (args) => (
  <Card {...args} />
);

export const Default = Template.bind({});

Default.args = {
    text:"Card",
    Icon:FiActivity
};