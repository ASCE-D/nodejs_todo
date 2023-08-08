const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const errorMiddleware = require("./middleware/error");

//config
dotenv.config({path: "backend/config/.env"});
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

//routes
const task = require("./routes/taskRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", task);
app.use("/api/v1", user);


//Middleware for errors
app.use(errorMiddleware);

module.exports = app;

