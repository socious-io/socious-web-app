/*
 * Recommendations section of user profile
 */

import React from 'react';

//components
import RecommendationCard from './RecommendationCard';
import Title from './Title';

const Recommendations = () => {
  return (
    <div className="px-4  border-t border-grayLineBased ">
      <Title>Recommendations</Title>
      <RecommendationCard />
      <RecommendationCard />
      <RecommendationCard />
      <p className="text-primary py-4">See all recommendations</p>
    </div>
  );
};

export default Recommendations;
