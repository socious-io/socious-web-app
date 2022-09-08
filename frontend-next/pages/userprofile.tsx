import MainContent from '@components/common/UserProfile/MainContent';
import Header from '@components/common/UserProfile/MainContent/Header';
import type {NextPage} from 'next';

import React from 'react'

const UserProfile : NextPage = () => {
  return (
    <div className='w-full'>
      <MainContent/>
    </div>
  )
}

export default UserProfile