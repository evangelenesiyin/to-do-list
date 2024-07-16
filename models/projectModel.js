import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
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

const Project = model("Project", projectSchema);

export default Project;
