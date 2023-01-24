import dotendv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";

import { healthCheckSchema } from "../swagger-schemas/health-check";
import { practitionerSchema } from "../swagger-schemas/practitioner-schema";

dotendv.config();

/**
 * Swagger definition.
 */
const swaggerDefinition = {
  openapi: "3.0.1",
  components: {
    schemas: {
      HealthCheckSchema: healthCheckSchema,
      PractitionerSchema: practitionerSchema,
    },
  },
  info: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION,
  },
};

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["src/routes/*.ts", "src/swagger-schemas/*.ts"],
};

/**
 * Initialize swagger-jsdoc.
 */
export const swaggerSpec = swaggerJSDoc(swaggerOptions as swaggerJSDoc.Options);

export default swaggerSpec;
