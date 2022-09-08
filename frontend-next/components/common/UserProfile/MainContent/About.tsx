/*
 * The text written by the user about herself is placed in this file
 */

import React from 'react';
// components
import Title from './Title';

const About = () => {
  return (
    <div className="px-4 border-t border-grayLineBased ">
      <Title>About</Title>
      <p className="text-graySubtitle w-4/6 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla incidunt
        nobis ex corrupti vitae expedita ratione in quidem autem. Iusto, saepe.
        Magni est quo inventore neque voluptate ab eos ex?
      </p>
    </div>
  );
};

export default About;
