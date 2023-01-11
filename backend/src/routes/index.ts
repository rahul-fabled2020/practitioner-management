import { Router } from "express";

import swaggerSpec from "../utils/swagger";
import practitionerRoutes from "./practitionerRoutes";

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json
 */
router.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

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
 * Practitioner Routes
 */
router.use("/practitioners", practitionerRoutes);

export default router;
