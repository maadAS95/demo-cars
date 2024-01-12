const express = require("express");
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

require("dotenv").config();

const { createonnection } = require("./configuration/connectiondbmongo");
const multer = require("multer");

const carRouter = require("./routes/cars.route");
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 4 * 2048 * 2048 * 2048, //8MB max file(s) size
    },
  })
);
app.use("/images", express.static(__dirname + "/public/uploads/images"));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/cars", carRouter);

createonnection();

app.listen(port, () => {
  `server is running on port ${port}`;
});
