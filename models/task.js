const mongoose = require("mongoose");


const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: [true, "Please Enter Your Task"]
    },
    isCompleted: {
        type: Boolean,
        default: false,
      },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
});


module.exports = mongoose.model("Task", taskSchema);