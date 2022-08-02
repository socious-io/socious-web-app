/* eslint-disable max-len */

import AppConfig from './constants';

export const DEV_MODE_API = 'http://127.0.0.1:8370';
export const PROD_MODE_API = 'https://api.socious.io';
export const STAGING_MODE_API = 'https://api.socious.io';
export const ECHO_LARAVEL = 'https://api.socious.io';
export const GOOGLE_API = 'AIzaSyDJDyCE_C1CXFyFie7v5yGvdE5cXm9ZlOE';
export const TERM_URL = (language: string) => {
  switch (language) {
    case AppConfig.KEY_LANGUAGE_ENGLISH:
      return 'https://socious.io/user-agreement';

    case AppConfig.KEY_LANGUAGE_JAPAN:
      return 'https://socious.io/user-agreement-ja';

    default:
      return 'https://socious.io/user-agreement';
  }
};
export const PRIVACY_URL = (language: string) => {
  switch (language) {
    case AppConfig.KEY_LANGUAGE_ENGLISH:
      return 'https://socious.io/privacy-policy';
    case AppConfig.KEY_LANGUAGE_JAPAN:
      return 'https://socious.io/privacy-policy-ja';
    default:
      return 'https://socious.io/privacy-policy';
  }
};
export const APP_MODE_URL = {
  dev: DEV_MODE_API,
  prod: PROD_MODE_API,
  staging: STAGING_MODE_API,
};
export type AppModeType = keyof typeof APP_MODE_URL;

export const ApiConstants = {
  LOGIN: '/auth/login',
  LOGOUT: '/api/logout',
  CHECK_EMAIL_EXIST: '/api/checkEmail',
  CHANGE_PASSWORD: '/api/change-password',
  CHANGE_PASSWORD_DIRECT: '/api/change-password-direct',
  REGISTER: '/api/register',
  REFRESH_TOKEN: '',
  GET_NEWS_FEED: '/api/list-new-feed',
  SEND_OTP: '/api/otp',
  SEND_OTP_FORGOT: '/api/send-otp-forgot',
  TERMS: '/api/terms-conditions',
  SEND_OTP_CONFIRM: '/api/otp/confirm',
  RESET_PASSWORD: '/api/forgot-password',
  CREATE_POST: '/api/create-post',
  GET_PROFILE: '/api/profile',
  GET_LIST_PASSION: '/api/list-passions',
  GET_FOLLOWERS: '/api/follower-user-or-page-list/',
  GET_FOLLOWING: '/api/following-user-or-page-list/',
  FOLLOW: '/api/follow-by-user-or-page',
  GET_BUSINESS_PROFILE: '/api/business-pages-detail',
  GET_OTHER_PROFILE: '/api/profile-other/',
  GET_OTHER_BUSINESS_PROFILE: '/api/business-pages-detail-other/',
  GET_INITIATIVES: '',
  GET_MY_POST: '',
  GET_MY_DELETED_POST: '',
  UPDATE_COVER_PROFILE: '/api/update-cover-image',
  UPDATE_AVATAR_PROFILE: '/api/update-avatar',
  UPDATE_COVER_BUSINESS_PROFILE: '/api/update-business-cover',
  UPDATE_AVATAR_BUSINESS_PROFILE: 'api/update-business-image',
  GET_LIST_TOP_SKILL: '/api/list-skills',
  GET_LIST_MOBILE_COUNTRY: '/api/get-list-mobile-country',
  GET_LIS_COUNTRY: '/api/list-country',
  UPDATE_MY_PROFILE: '/api/update-profile',
  UPDATE_MY_BUSINESS_PROFILE: '/api/update-business-pages',
  CREATE_BUSINESS: '/api/business-pages',
  POST_DETAIL: '/api/post-detail/',
  LIKE_POST: '/api/likes-posts/',
  EDIT_POST: '/api/update-post/',
  DELETE_POST: '/api/delete-post/',
  POST: '/api/posts/',
  DELETE_COMMENT: '/api/comments/',
  LIKE_COMMENT: '/api/likes-comments/',
  UPDATE_TOP_SKILLS_USER: '/api/update-skills-user',
  GET_NOTIFICATION: '/api/notifications',
  SWITCH_LANGUAGE: '/api/change-lang',
  SWITCH_USER_BUSINESS: '/api/change-view-as',
  DELETE_AVATAR_BUSINESS: '/api/delete-business-image',
  DELETE_COVER_BUSINESS: '/api/delete-business-cover',
  DELETE_AVATAR_PROFILE: '/api/delete-avatar',
  DELETE_COVER_PROFILE: '/api/delete-cover-image',
  SEARCH_USER: '/api/search',
  GET_COUNT_NOTIFICATION: '/api/count/notifications',
  GET_RECENT_SEARCH: '/api/get-history-search',
  STORE_RECENT_SEARCH: '/api/store-history-search',
  DELETE_RECENT_SEARCH: '/api/delete-history-search/',
  CLEAR_RECENT_SEARCH: '/api/delete-all-history-search',
  GET_LIST_LIKES: '/api/post-like-list/',
  GET_NEW_CHAT: '/api/get-list-new-chat',
  CHAT_MESSAGE: '/api/post-new-message-chat',
  GET_LIST_MESSAGE: '/api/get-detail-room-chat',
  GET_HISTORY_CHAT: '/api/get-list-conversations',
  GET_MSG_UNSEEN: '/api/get-conversations-unseen',
  RESET_COUNT_NOTIFICATION: '/api/get-count-notification-viewed',
  GET_LIST_REASON: '/api/list-reasons',
  REPORT_POST: (postId: string | number) => `api/posts/${postId}/reports`,
  REPORT_COMMENT: (commentId: string | number) =>
    `/api/comments/${commentId}/reports`,
  BLOCK: '/api/block-user-or-page',
  GET_BLOCK_LIST: '/api/get-list-blocks',
  RESEND_EMAIL: '/api/send-code-again',
  DELETE_ROOM_CHAT: (roomId: string) =>
    `/api/chat/${roomId}/destroy-conversation`,
  DELETE_MESSAGE: (chatId: number) => `/api/chat/${chatId}/delete-message`,
  CHECK_BLOCK: '/api/check-block',
  SEARCH_CITY: (keyword: string, language?: string) =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keyword}&types=%28cities%29&language=${
      language ?? AppConfig.KEY_LANGUAGE_ENGLISH
    }&key=${GOOGLE_API}`,
};
