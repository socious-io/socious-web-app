import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Header} from '../../src/design-system/atoms/header/header';

export default {
  title: 'UI/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {onBackBtnClick: console.log};
