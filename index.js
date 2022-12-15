require("dotenv").config();
const express = require("express");
const sequlize = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.get("*", (res) => {
  try {
    res.status(404).send("what???");
  } catch (e) {}
});
//обработка ошибки
app.use(errorHandler);

const start = async () => {
  try {
    await sequlize.authenticate();
    await sequlize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
