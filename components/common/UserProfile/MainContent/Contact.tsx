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
import {IdentityType} from '@models/identity';
import {useFormattedLocation} from 'services/formatLocation';
interface Props {
  address?: string;
  country?: string;
  city?: string;
  mobile_country_code?: string;
  email?: string;
  phone?: string;
  website?: string;
  status: IdentityType;
}

// TODO: not sure it makes sense for this component to be shared
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
  const location = useFormattedLocation({country, city});

  return (
    <div className="border-t  border-grayLineBased px-4">
      <Title>Contact</Title>

      {status === 'organizations' ? (
        <>
          {(address || location) && (
            <div className="mb-4 flex">
              <MapPinIcon className="h-6 w-6 stroke-1.5 text-secondary" />
              <p className="w-3/6 pl-4 text-sm text-black">
                {address || location}
              </p>
            </div>
          )}
          {mobile_country_code && phone && (
            <div className="mb-4 flex">
              <PhoneIcon className="h-6 w-6 stroke-1.5 text-secondary " />
              <p className="w-3/6 pl-4 text-sm text-black">
                {mobile_country_code} {phone}
              </p>
            </div>
          )}
          {email && (
            <div className="mb-4 flex">
              <AtSymbolIcon className="h-6 w-6 stroke-1.5 text-secondary" />
              <p className="w-3/6 pl-4 text-sm text-black">{email}</p>
            </div>
          )}
          {website && (
            <div className="mb-4 flex">
              <GlobeAltIcon className="h-6 w-6 stroke-1.5 text-secondary " />
              <p className="w-3/6 break-all pl-4 text-sm text-black">
                <a href={website} target="_blank" rel="noreferrer">
                  {website}
                </a>
              </p>
            </div>
          )}
        </>
      ) : (
        location && (
          <div className="mb-4 flex">
            <MapPinIcon className="h-6 w-6 stroke-1.5 text-secondary" />
            <p className="w-3/6 pl-4 text-sm text-black">{location}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Contact;
