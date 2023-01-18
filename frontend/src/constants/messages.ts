const MESSAGES = {
  REQUIRED: (fieldName: string) => `${fieldName} is required field.`,
  CREATED: (resource: string) => `${resource} created successfully.`,
  VALID_EMAIL: (fieldName: string) => `${fieldName} must be a valid email.`,
  INVALID_LENGTH: (fieldName: string, length: number) => `${fieldName} must be at least ${length} characters long.`,
};

export const AUTH_MESSAGES = {
  NAME_REQUIRED: MESSAGES.REQUIRED('Name'),
  EMAIL_REQUIRED: MESSAGES.REQUIRED('Email'),
  VALID_EMAIL: MESSAGES.VALID_EMAIL('Email'),
  PASSWORD_REQUIRED: MESSAGES.REQUIRED('Password'),
  RE_PASSWORD_REQUIRED: MESSAGES.REQUIRED('Confirm Password'),
  PASSWORD_INVALID_LENGTH: MESSAGES.INVALID_LENGTH('Password', 8),
  USER_CREATED: MESSAGES.CREATED('User'),
};
