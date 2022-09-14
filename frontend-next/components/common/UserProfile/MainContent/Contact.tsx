/*
 * user location is in this file
 */
import React from 'react';

//components
import Title from './Title';

//icons
import {
  LocationMarkerIcon,
  PhoneIcon,
  AtSymbolIcon,
  GlobeAltIcon,
} from '@heroicons/react/outline';

//interfaces
interface Props {
  address?: string;
  country?: string;
  city?: string;
  mobile_country_code?: string;
  email?: string;
  phone?: string;
  website?: string;
  status: 'user' | 'organization';
}

const Contact: React.FC<Props> = ({
  address,
  country,
  city,
  mobile_country_code,
  email,
  phone,
  website,
  status,
}) => {
  return (
    <div className="px-4  border-t border-grayLineBased">
      <Title>Contact</Title>

      {status === 'organization' ? (
        <>
          <div className="flex mb-4">
            <LocationMarkerIcon className="h-6 w-6 text-secondary stroke-1.5" />
            <p className="w-3/6 text-black pl-4 text-sm">
              {address && address + ' ,'}
            </p>
          </div>
          <div className="flex mb-4">
            <AtSymbolIcon className="h-6 w-6 text-secondary stroke-1.5 " />
            <p className="w-3/6 text-black pl-4 text-sm">
              {mobile_country_code && phone
                ? mobile_country_code + phone
                : 'No phone Number'}
            </p>
          </div>
          <div className="flex mb-4">
            <PhoneIcon className="h-6 w-6 text-secondary stroke-1.5" />
            <p className="w-3/6 text-black pl-4 text-sm">
              {email ? email : 'No Email'}
            </p>
          </div>
          <div className="flex mb-4">
            <GlobeAltIcon className="h-6 w-6 text-secondary stroke-1.5 " />
            <p className="w-3/6 text-black pl-4 text-sm break-all">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer">
                  {website}
                </a>
              ) : (
                'No website'
              )}
            </p>
          </div>
        </>
      ) : (
        <div className="flex mb-4">
          <LocationMarkerIcon className="h-6 w-6 text-secondary stroke-1.5" />
          <p className="w-3/6 text-black pl-4 text-sm">
            {city && city + ' ,'} {country}
          </p>
        </div>
      )}
    </div>
  );
};

export default Contact;
