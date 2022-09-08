/*
 * this component shows the number of mutual connections and
 * their avatar (maximum 3 avatar) in the user profile
 */
import React from 'react';

//components
import Avatar from '@components/common/Avatar/Avatar';

const MutaulConnections = () => {
  return (
    <div className="flex relative px-4  mt-5 items-center">
      <div className=" pr-4 ">
        <Avatar size="m" />
        <Avatar size="m" className=" absolute left-8 top-0 " />
        <Avatar size="m" />
      </div>
      <p className="text-secondary ml-5">You have +3 connections</p>
    </div>
  );
};

export default MutaulConnections;
