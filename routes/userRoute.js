const express = require("express");

const { createUser, loginUser, logoutUser, currentUser } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// router.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//      });

router.route("/user/logout").get(logoutUser);
router.route("/user/login").post(loginUser);
router.route("/user/register").post(createUser);
router.route("/user/current").get(isAuthenticatedUser ,currentUser);

module.exports = router;
