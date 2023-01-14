import Joi from "@hapi/joi";
import Boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";

import { User } from "../models/User";
import validate from "../utils/validation";
import { MIN_PASSWORD_LENGHT } from "../constants/constant";
import { USER_MESSAGES } from "../constants/messages";

const schema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(MIN_PASSWORD_LENGHT).required(),
  rePassword: Joi.string().equal(Joi.ref("password")).required(),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
export function userValidator(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

export const validateEmailExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await User.findOne({
    email: req.body.email,
    _id: { $ne: req.body._id || req.params.id },
  });

  if (result === null) {
    return next();
  }

  return next(Boom.conflict(USER_MESSAGES.EMAIL_ALREADY_EXISTS));
};
