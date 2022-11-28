import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Button} from '../design-system/button/button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary = <Button color="green">Button</Button>;
