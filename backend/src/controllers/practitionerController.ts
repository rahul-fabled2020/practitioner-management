import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import * as practitionerService from "../services/practitionerService";

export function fetchAll(req: Request, res: Response, next: NextFunction) {
  practitionerService
    .fetchAll()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function fetchById(req: Request, res: Response, next: NextFunction) {
  practitionerService
    .fetchById(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function create(req: Request, res: Response, next: NextFunction) {
  practitionerService
    .create(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

export function update(req: Request, res: Response, next: NextFunction) {
  practitionerService
    .update(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function destroy(req: Request, res: Response, next: NextFunction) {
  practitionerService
    .destroy(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}
