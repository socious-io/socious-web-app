import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LevelBadge} from '../../src/design-system/atoms/level-badge/level-badge';

export default {
  title: 'ATOM/LevelBadge',
  component: LevelBadge,
} as ComponentMeta<typeof LevelBadge>;

const Template: ComponentStory<typeof LevelBadge> = (args) => (
  <LevelBadge {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  level: 1,
  size: 's',
};
