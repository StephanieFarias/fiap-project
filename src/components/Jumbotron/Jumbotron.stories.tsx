import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Jumbotron, JumbotronProps} from '.';

export default {
  component: Jumbotron,
  title: 'Components/Jumbotron',
} as Meta;

const Template: Story<JumbotronProps> = (args) => (
  <Jumbotron  {...args}/>
);

export const Default = Template.bind({});

Default.args = {
  image:"https://picsum.photos/1440/312",
  title:"Title",
  description:"Description"
};