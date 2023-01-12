import express from "express";
import { fileValidator } from "../validators/fileValidator";
import * as fileController from "../controllers/fileController";

const router = express.Router();

router.post("/", fileValidator, fileController.upload);

export default router;
