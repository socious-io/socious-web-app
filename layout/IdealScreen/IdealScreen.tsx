import React from 'react';
import Image from 'next/image';
import Logo from 'asset/icons/logo-color.svg';
import TypoCompany from 'asset/icons/typo-company.svg';

const IdealScreen = () => {
  return (
    <div className="-my-10 flex h-screen items-center justify-center bg-offWhite">
      <div>
        <div>
          <Image src={Logo} alt="Socious Logo" width="100%" height="100%" />
        </div>
        <div>
          <Image src={TypoCompany} alt="Socious" width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default IdealScreen;
