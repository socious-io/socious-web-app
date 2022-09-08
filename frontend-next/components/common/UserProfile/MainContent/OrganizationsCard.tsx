/*
 * organization card
 * (Display the information of the organizations that the user has followed
 * like name, logo , location ,and role)
 */

import React from 'react';
import Image from 'next/image';

const OrganizationsCard = () => {
  // organ image route
  const company_avatar = require('../../../../asset/images/company-avatar-filled.png');

  return (
    <div className="flex items-center my-4 text-base">
      <div className=" border border-grayLineBased w-12 h-12 rounded-full flex items-center justify-center">
        <Image src={company_avatar} alt="socious logo" width={26} height={26} />
      </div>
      <div className="w-1/2 pl-4">
        <p className="text-black ">Organization</p>
        <p className="text-graySubtitle">Location</p>
      </div>
      <p className="text-graySubtitle w-1/2 pl-4">Role</p>
    </div>
  );
};

export default OrganizationsCard;
