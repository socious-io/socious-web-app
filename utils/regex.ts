export const rxNotMobileNumber = /^\d{3,15}$/;

export const rxEmail =
  /^[a-zA-Z0-9][a-zA-Z0-9_\.\-]*@[a-zA-Z0-9][[a-zA-Z0-9_\.\-]*(\.[a-zA-Z]+)$/;
export const rxEmailDoubleSpec = /([_.-]){2,}|[._-]+@|@[._-]+/;
export const rxPassword =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{7,128}$/;
export const rxName = /^[a-zA-Zぁ-ん一-龥\s]+$/;
export const rxHasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/;
export const rxHasUpperCase = /(?=.*[A-Z])/;
export const rxHasLowerCase = /(?=.*[a-z])/;
export const rxHasNumber = /(?=.*\d)/;
export const rxNoSpecialCharacters = /^[\p{L}'-]+$/u;
export const rxNoSpecialCharactersMultiWords = /^[\p{L}'-]+(?: [\p{L}'-]+)*$/u;
export const rxCheckUrl = /^(https?):\//;
export const rxNotNumber = /[^0-9]/g;
export const rxParsedName = /~.*~/g;
export const usernamePattern =
  /^(?=.{6,24}$)(?![_.])(?!.*[_.]{2})[a-z][a-z0-9._-]+$/;
