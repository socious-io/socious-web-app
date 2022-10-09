/*
 * Recommendations section
 */

import React, { useState } from 'react';

// components
import Title from './Title';
import Button from '@components/common/Button/Button';

//interfaces
interface Props {
  own_user: boolean;
  recommendation_requested?: boolean;
}
const Recommendations: React.FC<Props> = ({ own_user, recommendation_requested }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(recommendation_requested || false);

  const handleRequestRecommendation = async () => {
    if (!success) {
      setLoading(true);
      // TODO: add api call here
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1000);
    }
  }

  return (
    <div className="border-t border-grayLineBased px-4 mb-4">
      <Title>Recommendations</Title>
      {!own_user ? (
        <Button
          disabled={loading || success}
          onClick={handleRequestRecommendation}
          variant={'outline'}
        >
          {success ? "Request Sent" : "Request a recommendation"}
        </Button>
      ) : null}
    </div>
  );
};

export default Recommendations;
