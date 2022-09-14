/*
 * Name ,bio , mutaul connectins , the member of connections, and followers of
 * user profile component
 */

import React from 'react';

interface Props {
  first_name: string;
  last_name: string;
  bio: string;
  followings: number;
  followers: number;
}
const ProfileInfo: React.FC<Props> = ({
  first_name,
  last_name,
  bio,
  followings,
  followers,
}) => {
  return (
    <div className="px-4">
      <h1 className=" text-2xl text-text font-worksans font-semibold ">
        {first_name} {last_name}
      </h1>
      <div className="flex gap-x-4 mt-1 mb-4 font-base">
        <p className="text-grayInputField">{followings} Conections</p>
        <p className="text-grayInputField">{followers} Followers</p>
      </div>
      <p className="text-left text-black text-sm whitespace-pre-line">{bio}</p>
    </div>
  );
};

export default ProfileInfo;
