/*
 * Name ,bio , mutaul connectins , the member of connections, and followers of
 * user profile component
 */

import React from 'react';

const ProfileInfo = () => {
  return (
    <div className="px-4">
      <h1 className=" text-lg text-text font ">Name Last</h1>
      <div className="flex gap-x-4 mt-1 mb-4">
        <p className="text-grayInputField">0 Conections</p>
        <p className="text-grayInputField">0 Followers</p>
      </div>
      <p className="text-left text-black">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat illo
        explicabo voluptates deserunt similique quis! Dolor blanditiis ea velit
        libero?
      </p>
    </div>
  );
};

export default ProfileInfo;
