import express from "express";
import * as practitionerController from "../controllers/practitionerController";

const router = express.Router();

/**
 *  @openapi
 *  /api/practitioners:
 *    get:
 *      tags:
 *        - Practitioner
 *      summary: Retrieve Practitioners
 *      responses:
 *        200:
 *          description: Practitioners retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/PractitionerSchema'
 *      401:
 *        description: Unauthorized
 */
router.get("/", practitionerController.fetchAll);

/**
 *  @openapi
 *  /api/practitioners/{id}:
 *    get:
 *      tags:
 *        - Practitioner
 *      summary: Retrieve Practitioner
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            example: 63bd0f1918dbbcdd6f49f442
 *            description: The id of the Practitioner
 *      responses:
 *        200:
 *          description: Practitioner retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    $ref: '#/components/schemas/PractitionerSchema'
 *      401:
 *        description: Unauthorized
 */
router.get("/:id", practitionerController.fetchById);

/**
 *  @openapi
 *  /api/practitioners:
 *    post:
 *      tags:
 *        - Practitioner
 *      summary: Create Practitioner
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PractitionerSchema'
 *      responses:
 *        201:
 *          description: Practitioner created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    $ref: '#/components/schemas/PractitionerSchema'
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.post("/", practitionerController.create);

/**
 *  @openapi
 *  /api/practitioners/{id}:
 *    put:
 *      tags:
 *        - Practitioner
 *      summary: Update Practitioner
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            example: 63bd0f1918dbbcdd6f49f442
 *            description: The id of the Practitioner
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PractitionerSchema'
 *      responses:
 *        200:
 *          description: Practitioner updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    $ref: '#/components/schemas/PractitionerSchema'
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 */
router.put("/:id", practitionerController.update);

/**
 *  @openapi
 *  /api/practitioners/{id}:
 *    delete:
 *      tags:
 *        - Practitioner
 *      summary: Delete Practitioner
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            example: 63bd0f1918dbbcdd6f49f442
 *            description: The id of the Practitioner
 *      responses:
 *        204:
 *          description: Practitioners deleted successfully
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.delete("/:id", practitionerController.destroy);

export default router;
