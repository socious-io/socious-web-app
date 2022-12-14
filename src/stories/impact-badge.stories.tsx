import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ImpactBadge} from '../../src/design-system/atoms/impact-badge/impact-badge';

export default {
  title: 'UI/ImpactBadge',
  component: ImpactBadge,
} as ComponentMeta<typeof ImpactBadge>;

const Template: ComponentStory<typeof ImpactBadge> = (args) => (
  <ImpactBadge {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  iconUrl: '',
  color: '#DD1367',
};
