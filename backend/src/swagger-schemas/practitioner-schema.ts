import { GENDER } from "../constants/constant";

export const practitionerSchema = {
  type: "object",
  properties: {
    fullName: { type: "string" },
    email: { type: "string" },
    contact: { type: "string" },
    dob: { type: "string", format: "date-time" },
    photographUrl: { type: "string" },
    workingDays: { type: "array", items: { type: "string" } },
    startTime: { type: "string", format: "date-time" },
    endTime: { type: "string", format: "date-time" },
    address: { type: "string" },
    gender: {
      type: "string",
      enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER],
    },
    notes: { type: "string" },
    isICUSpecialist: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: [
    "fullName",
    "email",
    "contact",
    "dob",
    "workingDays",
    "startTime",
    "endTime",
    "gender",
  ],
};
