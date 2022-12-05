import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Article} from '../design-system/molecules/article/article';

export default {
  title: 'UI/Article',
  component: Article,
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = (args) => (
  <Article {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  title: 'Lorem ipsum dolor sit amet',
  body: 'consectetur adipisicing elit. Doloribus fugit recusandae porro est dolorem, dolorum, eaque impedit cumque fugiat voluptatibus nemo eum nesciunt iure expedita laborum dolore tenetur, minima null',
};
