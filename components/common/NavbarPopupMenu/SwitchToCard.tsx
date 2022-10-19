import {LoginIdentity} from '@models/identity';
import Link from 'next/link';
import React from 'react';
import Avatar from '../Avatar/Avatar';

export interface SwitchToCardProps {
  onSwitchIdentity: (identity: LoginIdentity) => void;
  identities: LoginIdentity[];
}

const SwitchToCard = ({onSwitchIdentity, identities}: SwitchToCardProps) => {
  return (
    <div className="space-y-4 border-grayLineBased bg-offWhite p-4 md:!border-0">
      <label className="text-primary">Switch To</label>
      <ul className="list-none space-y-4 pl-2">
        {identities.map(
          (identity: LoginIdentity) =>
            !identity.current && (
              <li
                key={identity?.meta?.id}
                className="flex cursor-pointer flex-row items-center gap-2"
                onClick={() => onSwitchIdentity(identity)}
              >
                <div>
                  <Avatar
                    size="m"
                    type={identity.type}
                    src={
                      identity.type === 'users'
                        ? identity?.meta?.avatar
                        : identity?.meta?.image
                    }
                  />
                </div>
                <div>{identity?.meta?.name}</div>
              </li>
            ),
        )}
        <li className="flex items-center space-x-4">
          <Link href="/app/organization/+new">
            <label className="cursor-pointer">Create Organization</label>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SwitchToCard;
