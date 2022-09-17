import {DateTime} from 'luxon';

export const isoToHumanTime = (isoString: string, localize: string = 'en-US') =>
  DateTime.fromISO(isoString, {locale: localize}).toRelative();
