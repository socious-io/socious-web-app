/*
 * The text written by the user about herself is placed in this file
 */

import React from 'react';
// components
import Title from './Title';

//interfaces
interface Props {
  paragraph?: string;
  title: string;
}
const Description: React.FC<Props> = ({title, paragraph}) => {
  return (
    <div className="px-4 border-t border-grayLineBased ">
      <Title>{title}</Title>
      <p className="text-graySubtitle w-4/6 mb-4 text-base">
        {paragraph ? paragraph : 'No information'}
      </p>
    </div>
  );
};

export default Description;
