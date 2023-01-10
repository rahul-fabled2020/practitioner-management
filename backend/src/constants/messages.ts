const MESSAGES = {
  NOT_FOUND: (resource: string) => `${resource} not found.`,
};

export const PRACTITIONER_MESSAGES = {
  NOT_FOUND: MESSAGES.NOT_FOUND("Practitioner"),
};
