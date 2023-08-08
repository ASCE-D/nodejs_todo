const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cors = require("cors"); // added
const app = require("./app");



//config
dotenv.config({path: "backend/config/.env"});

//database connection
connectDatabase();



// app.use(cors({ origin: true, credentials: true })); // added

//middleware
app.use(express.json());
app.get("/", (req, res) => res.send("Server up & running"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
});