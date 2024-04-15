const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { initialize } = require("express-openapi");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs"); // Import YAML parser

const app = express();

app.listen(3030);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Load API documentation from YAML file
const apiDoc = YAML.load("./api/api-doc.yml");

// OpenAPI routes
initialize({
  app,
  apiDoc, // Pass the parsed YAML object
  paths: "./api/paths",
});

// OpenAPI UI
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3030/api-docs",
    },
  })
);

console.log("App running on port http://localhost:3030");
console.log(
  "OpenAPI documentation available in http://localhost:3030/api-documentation"
);

module.exports = app;
