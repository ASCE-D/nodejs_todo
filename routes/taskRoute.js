const express = require("express");
const {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} = require("../controllers/taskController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


router.route("/tasks").get(isAuthenticatedUser, getAllTasks);
router.route("/tasks/new").post(isAuthenticatedUser, createTasks);
router.route("/tasks/:id").put(isAuthenticatedUser, updateTasks);
router.route("/tasks/:id").delete(isAuthenticatedUser, deleteTasks);


module.exports = router;