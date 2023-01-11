import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";
import * as errorHandler from "./middlewares/errorHandler";

import routes from "./routes";
import swaggerSpec from "./utils/swagger";

dotenv.config();

const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(errorHandler.bodyParser);

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
