import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import fileUpload from "express-fileupload";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import * as errorHandler from "./middlewares/errorHandler";

import routes from "./routes";
import swaggerSpec from "./utils/swagger";
import {
  cloudinaryConfig,
  applicationConfig,
  expressFileUploadConfig,
} from "./config/config";

dotenv.config();
cloudinary.config(cloudinaryConfig);

const express = require("express");

const app = express();
const port = applicationConfig.serverPort;

app.locals.title = applicationConfig.appName;
app.locals.version = applicationConfig.appVersion;

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(errorHandler.bodyParser);
app.use(fileUpload(expressFileUploadConfig));

// API Routes
app.use("/api", routes);

app.use("/api-docs/index.html", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs", (req: Request, res: Response) =>
  res.redirect("/api-docs/index.html")
);

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
