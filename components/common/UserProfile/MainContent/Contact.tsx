/*
 * user location is in this file
 */
import React from 'react';

//components
import Title from './Title';

//icons
import {
  MapPinIcon,
  PhoneIcon,
  AtSymbolIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

//interfaces
interface Props {
  address?: string;
  country?: string;
  city?: string;
  mobile_country_code?: string;
  email?: string;
  phone?: string;
  website?: string;
  status: 'users' | 'organizations';
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
    <div className="border-t  border-grayLineBased px-4">
      <Title>Contact</Title>

      {status === 'organization' ? (
        <>
          <div className="mb-4 flex">
            <MapPinIcon className="h-6 w-6 stroke-1.5 text-secondary" />
            <p className="w-3/6 pl-4 text-sm text-black">
              {address ? (
                address
              ) : (
                <p className="text-graySubtitle">Location</p>
              )}
            </p>
          </div>
          <div className="mb-4 flex">
            <AtSymbolIcon className="h-6 w-6 stroke-1.5 text-secondary " />
            <p className="w-3/6 pl-4 text-sm text-black">
              {mobile_country_code && phone ? (
                mobile_country_code + phone
              ) : (
                <p className="text-graySubtitle">Phone Number</p>
              )}
            </p>
          </div>
          <div className="mb-4 flex">
            <PhoneIcon className="h-6 w-6 stroke-1.5 text-secondary" />
            <p className="w-3/6 pl-4 text-sm text-black">
              {email ? email : <p className="text-graySubtitle">Email</p>}
            </p>
          </div>
          <div className="mb-4 flex">
            <GlobeAltIcon className="h-6 w-6 stroke-1.5 text-secondary " />
            <p className="w-3/6 break-all pl-4 text-sm text-black">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer">
                  {website}
                </a>
              ) : (
                'Website'
              )}
            </p>
          </div>
        </>
      ) : (
        <div className="mb-4 flex">
          <MapPinIcon className="h-6 w-6 stroke-1.5 text-secondary" />
          <p className="w-3/6 pl-4 text-sm text-black">
            {city && city + ' ,'} {country}{' '}
            {!city && !country && <p className="text-graySubtitle">Location</p>}
          </p>
        </div>
      )}
    </div>
  );
};

export default Contact;
