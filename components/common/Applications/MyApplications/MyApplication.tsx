import {TApplicant} from '@models/applicant';
import React from 'react';

const MyApplication = ({applicant}: {applicant: TApplicant}) => {
  return (
    <div className="w-full rounded-2xl border border-grayLineBased pb-4">
      <div className="border-grayLinedBased w-full rounded-2xl border bg-white"></div>
    </div>
  );
};

export default MyApplication;
