import express from "express";
import mongoose from "mongoose";
import debugLib from "debug";
import dotenv from "dotenv";
import path from "path";
import logger from "morgan";
import checkToken from "./config/checkToken.js";
import usersRouter from "./routes/usersRouter.js";
import taskRouter from "./routes/taskRouter.js";

// Load environment variables from .env file
dotenv.config();

const debug = debugLib("procuratio:config:database");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "dist")));

// Custom middleware to check token
app.use(checkToken);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/tasks", taskRouter);

// Database connection
mongoose.set("debug", true);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    const db = mongoose.connection;
    debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
  })
  .catch((error) => {
    debug(`Database connection error: ${error}`);
  });

app.listen(port, () => {
  debug(`Express app running on port ${port}`);
});
