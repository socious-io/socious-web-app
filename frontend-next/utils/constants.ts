import { MobileCountry } from "models/mobileCountry";

export const defaultMobileCode: MobileCountry = {
    id: 127,
    country: 'Japan',
    calling_code: '+81',
  };

  const AppConfig = {
    TOKEN: 'TOKEN',
    APP_MODE: 'APP_MODE',
    APP_THEME: 'APP_THEME',
    EXPIRED_TOKEN: 'EXPIRED_TOKEN',
    PROFILE: 'PROFILE',
    KEY_LANGUAGE_ENGLISH: 'en_US',
    KEY_LANGUAGE_JAPAN: 'ja_JP',
    EMAIL_SUPPORT: 'support@socious.io',
  };
  export default AppConfig;