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
        <h3 className="text-black">Name</h3>
        <p className="text-graySubtitle">. Time</p>
      </div>
      <p className="text-black  bg-secondaryLight rounded-lg  p-4 mt-4 text-left">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        tenetur accusantium doloribus dolorum sunt consequuntur rerum voluptas,
        vero aut, itaque corrupti, tempore perspiciatis maiores. Ipsam laborum
        explicabo sit amet magnam!
      </p>
    </>
  );
};

export default RecommendationCard;
