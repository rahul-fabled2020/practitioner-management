import express from "express";
import * as practitionerController from "../controllers/practitionerController";

const router = express.Router();

router.get("/", practitionerController.fetchAll);

router.get("/:id", practitionerController.fetchById);

router.post("/", practitionerController.create);

router.put("/:id", practitionerController.update);

router.put("/:id", practitionerController.destroy);

export default router;
