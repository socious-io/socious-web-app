/*
 * user location is in this file
 */
import React from 'react';

//components
import Title from './Title';

//icons
import {LocationMarkerIcon} from '@heroicons/react/outline';

const Contact = () => {
  return (
    <div className="px-4  border-t border-grayLineBased">
      <Title>Contact</Title>
      <div className="flex mb-4">
        <LocationMarkerIcon className="h-6 text-secondary" />
        <p className="w-3/6 text-black pl-4">
          1-1 Chiyoda, Chiyoda City, Tokyo, Tokyo, Japan
        </p>
      </div>
    </div>
  );
};

export default Contact;
