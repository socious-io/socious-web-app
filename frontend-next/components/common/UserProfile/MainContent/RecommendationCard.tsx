/*
 * Recommendation card (author name, text and time)
 */
import React from 'react';

// components
import Avatar from '@components/common/Avatar/Avatar';

const RecommendationCard = () => {
  return (
    <>
      <div className="flex items-center gap-x-4 mt-4">
        <Avatar size="m" />
        <p className="text-black text-sm">Name</p>
        <p className="text-graySubtitle text-sm">. Time</p>
      </div>
      <p className="text-black  bg-secondaryLight rounded-lg  p-4 mt-4 text-left text-base">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        tenetur accusantium doloribus dolorum sunt consequuntur rerum voluptas,
        vero aut, itaque corrupti, tempore perspiciatis maiores. Ipsam laborum
        explicabo sit amet magnam!
      </p>
    </>
  );
};

export default RecommendationCard;
