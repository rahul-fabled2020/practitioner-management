import * as yup from 'yup';
import { Days, Gender } from '../constants/constant';

export const practitionerSchema = yup.object().shape({
  fullName: yup.string().trim().required(),
  email: yup.string().email().required(),
  contact: yup.string().trim().length(10).required(),
  dob: yup.date().required(),
  photographUrl: yup.string().notRequired(),
  workingDays: yup
    .array()
    .of(yup.mixed().oneOf(Object.values(Days)))
    .required()
    .min(1),
  startTime: yup.date().required(),
  endTime: yup.date().required(),
  address: yup.string().notRequired(),
  gender: yup.mixed().oneOf(Object.values(Gender)).required(),
  notes: yup.string().notRequired(),
  isICUSpecialist: yup.boolean().notRequired(),
});
