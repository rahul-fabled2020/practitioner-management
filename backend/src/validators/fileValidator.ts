import Boom from "@hapi/boom";
import isEmpty from "lodash/isEmpty";
import { UploadedFile } from "express-fileupload";
import { NextFunction, Response, Request } from "express";

import { FILE_UPLOAD_MESSAGES } from "../constants/messages";
import { ALLOWED_FILE_MIMETYPES, FILE_SIZE_LIMIT } from "../constants/constant";

export function fileValidator(req: Request, res: Response, next: NextFunction) {
  try {
    if (isEmpty(req.files)) {
      return next(Boom.badRequest(FILE_UPLOAD_MESSAGES.NO_FILE_UPLOADED));
    }

    // check for multiple files
    for (let key in req.files) {
      const file = req.files[key] as UploadedFile;

      if (!ALLOWED_FILE_MIMETYPES.includes(file.mimetype)) {
        return next(Boom.badRequest(FILE_UPLOAD_MESSAGES.INVALID_TYPE));
      }

      if (file.size > FILE_SIZE_LIMIT) {
        return next(Boom.badRequest(FILE_UPLOAD_MESSAGES.INVALID_SIZE));
      }
    }

    next();
  } catch (error: any) {
    next(Boom.boomify(error));
  }
}
