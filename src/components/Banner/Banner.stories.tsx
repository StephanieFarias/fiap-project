import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Banner, BannerProps} from './';

export default {
  component: Banner,
  title: 'Components/Banner',
} as Meta;

const Template: Story<BannerProps> = (args) => (
  <Banner {...args} />
);

export const Default = Template.bind({});

Default.args = {
  text:"Banner",
  image:'https://picsum.photos/666/494'
};