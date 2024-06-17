import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [6, "Password should be longer than 6 characters"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password should be longer than 6 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = model("User", userSchema);

export default User;
