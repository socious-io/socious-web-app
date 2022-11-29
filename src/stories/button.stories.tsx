import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {Button} from '../design-system/button/button';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary = () => <Button color="red">Button</Button>;
