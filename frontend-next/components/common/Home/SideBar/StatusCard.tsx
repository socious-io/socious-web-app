import React from 'react';
import Link from 'next/link';

type StatusProp = {
  status?: string
}

const StatusCard: React.ElementType = ({ status = "None"}: StatusProp) => {
  return (
    <div className='p-4 rounded-2xl border border-grayLineBased flex items-center justify-between'>
      <div className='flex flex-row space-x-3'>
        <span className='text-graySubtitle'>
          Status
        </span>
        <span className='text-grayDisableButton'>{status || "None"}</span>
      </div>
      <div className='text-primary'>
        <Link href={"/update"}>
          Update
        </Link>
      </div>
    </div>
  );
};

export default StatusCard;