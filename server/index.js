"use strict";
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileRoutes = require("./routes/file-upload-routes");
const authMiddleware = require("./middlewares/authMiddleware");
const request = require("request");
const port = 8080;
const app = express();
var http = require("http");
app.use(cors());
console.log("DIR ", __dirname + "/.env");
require("./database")();

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "static")));
// app.use("/create", authMiddleware.protected_auth, express.static(path.join(__dirname, "static/html/")));
app.use(
  "/create",
  express.static(path.join(__dirname, "static/html/"))
);
app.use("/api", fileRoutes.routes);

app.listen(port, () => {
  console.log(`server is listening on url http://localhost:${port}`);
});
