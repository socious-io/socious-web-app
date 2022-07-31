export const rxNotMobileNumber = /^[0-9]{10}$/;

export const rxEmail = /^[a-zA-Z0-9][a-zA-Z0-9_\.\-]*@[a-zA-Z0-9][[a-zA-Z0-9_\.\-]*(\.[a-zA-Z]+)$/;
export const rxEmailDoubleSpec = /([_.-]){2,}|[._-]+@|@[._-]+/;
export const rxPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{7,128}$/;
// a-z : chi cho phep ki tu thuong
// A-Z : chỉ cho phép kí tự in hoa
// ぁ-ん : chỉ cho phép kí tự hiragana
// 一-龥 : chỉ cho phép kí tự hán
// ^- : không cho phép chứa dấu cach
// \s : cho phép chứa dấu cach
export const rxName = /^[a-zA-Zぁ-ん一-龥\s]+$/;
export const rxHasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/;
export const rxHasNumber = /(?=.*\d)/;
export const rxNoSpecialCharacters = /^[^\W]*$/;
export const rxFirstLastName = /^([^(0-9`=~!@#$%^&*()\-_+|}\][';":\/.\\,?><¿§₩«»ω⊙¤°℃℉€¥£¢¡®©0-9_+)])+$/;
export const rxCheckUrl = /^(https?):\//;
export const rxNotNumber = /[^0-9]/g;
export const rxParsedName = /~.*~/g;
export const usernamePattern =
  /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
