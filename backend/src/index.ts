import routes from "./routes";
import dotenv from "dotenv";
import * as errorHandler from "./middlewares/errorHandler";

dotenv.config();

const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
