import Boom from "@hapi/boom";
import Joi, { CustomHelpers, CustomValidator } from "@hapi/joi";

import { Date } from "mongoose";
import { NextFunction, Request, Response } from "express";

import { Practitioner } from "../models/Practitioner";

import validate from "../utils/validation";

import { GENDER } from "../constants/constant";
import { PRACTITIONER_MESSAGES } from "../constants/messages";

const isStartTimeIsLessThanEndTime = (startTime: Date, endTime: Date) => {
  return startTime < endTime;
};

const customEndTimeValidator: CustomValidator = (
  endTime: Date,
  helpers: CustomHelpers
) => {
  if (
    !isStartTimeIsLessThanEndTime(helpers.state.ancestors[0].startTime, endTime)
  ) {
    return helpers.error(PRACTITIONER_MESSAGES.START_DATE_LESS_THAN_END_DATE);
  }

  return endTime;
};

// Validation schema
export const schema = Joi.object({
  __v: Joi.number().allow(null),
  _id: Joi.string().allow(null),
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  contact: Joi.string().trim().required().length(10),
  dob: Joi.date().required(),
  photographUrl: Joi.string().uri().allow(""),
  workingDays: Joi.array().items(Joi.string()).required(),
  startTime: Joi.date().required(),
  endTime: Joi.date()
    .required()
    .custom(
      customEndTimeValidator,
      PRACTITIONER_MESSAGES.START_DATE_LESS_THAN_END_DATE
    ),
  address: Joi.string().allow(""),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required(),
  notes: Joi.string().allow(""),
  isICUSpecialist: Joi.boolean().default(false),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
export function practitionerValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

export const validateEmailExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await Practitioner.findOne({
    email: req.body.email,
    _id: { $ne: req.body._id || req.params.id },
  });

  if (result === null) {
    return next();
  }

  return next(Boom.conflict(PRACTITIONER_MESSAGES.EMAIL_ALREADY_EXISTS));
};
