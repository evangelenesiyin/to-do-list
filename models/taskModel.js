import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    sitePath: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: {
        values: ["Completed", "In Progress", "On Hold", "Pending"],
      },
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["Feature", "Style/UI", "Bug"],
      },
    },
    priority: {
      type: String,
      required: true,
      enum: {
        values: ["High", "Medium", "Low"],
      },
    },
    completedDate: {
      type: String,
    },
    api: {
      type: String,
    },
    apiMethod: {
      type: String,
      enum: {
        values: ["Get", "Post", "Patch", "Delete"],
      },
    },
    remarks: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

export default Task;
