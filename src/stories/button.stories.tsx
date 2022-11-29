import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Button} from '../design-system/button/button';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});

Primary.args = {color: 'blue'};
