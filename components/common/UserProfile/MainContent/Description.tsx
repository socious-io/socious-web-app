/*
 * The text written by the user/organization about missions or other paragraphs
 * is placed in this file
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
    <div className="border-t border-grayLineBased px-4 ">
      <Title>{title}</Title>
      <p className="mb-4 w-4/6 whitespace-pre-line break-all text-base text-graySubtitle ">
        {paragraph ? paragraph : 'No information'}
      </p>
    </div>
  );
};

export default Description;
