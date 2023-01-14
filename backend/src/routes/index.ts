import { Router } from "express";

import swaggerSpec from "../utils/swagger";
import { authenticateUser } from "../validators/authValidator";

import authRoutes from "./authRoutes";
import fileRoutes from "./fileRoutes";
import practitionerRoutes from "./practitionerRoutes";

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * @swagger
 * /api:
 *  get:
 *    summary: Health Check
 *    responses:
 *      200:
 *        description: "The App is Running."
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HealthCheckSchema'
 *      500:
 *        description: Something went wrong.
 */
router.get("/", (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

/**
 * GET /api/swagger.json
 */
router.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

/**
 * Auth Routes
 */
router.use("/auth", authRoutes);

/**
 * Practitioner Routes
 */
router.use("/practitioners", authenticateUser, practitionerRoutes);

/**
 * File Routes
 */
router.use("/files", authenticateUser, fileRoutes);

export default router;
