if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

//   app.use(express.urlencoded({extended: true}));
//   app.use(express.json());

//   app.use(session({
//      saveUnintialized: true,
//      secret: `${process.env.secret}`,
//   }))

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected..."))
  .catch(error => console.log("DB Connectioin error", error));

// Middleware
app.use(morgan("dev")); // logger for terminal
app.use(bodyParser.json()); // to read the data
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(expressValidator());

app.use("/", require("./Routes/user"));

app.listen(`${process.env.PORT}`, function() {
  console.log(`Running on port ${process.env.PORT}`);
});
