import { NextFunction, Request, Response } from "express";

import * as fileService from "../services/fileService";

export function upload(req: Request, res: Response, next: NextFunction) {
  fileService
    .handleSingleFileUpload(req.files)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function uploadMultiple(
  req: Request,
  res: Response,
  next: NextFunction
) {
  fileService
    .handleMultipleFilesUpload(req.files)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function destroy(req: Request, res: Response, next: NextFunction) {
  fileService
    .destroyFile(req.body.publicId)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}
