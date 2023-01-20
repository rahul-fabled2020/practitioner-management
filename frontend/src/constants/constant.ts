export enum Mode {
  EDIT = 'edit',
  CREATE = 'create',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Days {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
}

export const RESPONSE_TYPES = {
  JSON: 'json',
  TEXT: 'text',
  BLOB: 'blob',
  STREAM: 'stream',
  DOCUMENT: 'document',
  ARRAY_BUFFER: 'arraybuffer',
};

export const MAX_RETRIES = 5;
export const RESPONSE_STATUS = '';
export const CONTENT_TYPE_JSON = 'application/json';
export const DEFAULT_RESPONSE_TYPE = RESPONSE_TYPES.JSON;
export const DAYS_COLOR: { [key: string]: string } = {
  [Days.SUNDAY]: '#84D2C5',
  [Days.MONDAY]: '#E4C988',
  [Days.TUESDAY]: '#C27664',
  [Days.WEDNESDAY]: '#B05A7A',
  [Days.THURSDAY]: '#FFD372',
  [Days.FRIDAY]: '#FF99D7',
  [Days.SATURDAY]: '#905E96',
};
