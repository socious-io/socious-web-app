import {get} from 'utils/request';

const NEXT_PUBLIC_GOOGLE_API_KEY = process.env['NEXT_PUBLIC_GOOGLE_API_KEY'];

export const getPhoneCode = async (place: string) => {
  try {
    let response: any = await get(
      `https://restcountries.com/v3.1/alpha/${place}`,
    );
    const phoneInfo = response?.[0].idd;
    let code = phoneInfo.root;
    phoneInfo?.suffixes.forEach((suffix: string) => (code += suffix));
    return code;
  } catch (error) {
    console.log('ERROR for phone :---: ', error);
  }
};
