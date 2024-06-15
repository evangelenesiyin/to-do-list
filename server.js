import mongoose from "mongoose";
import debugLib from "debug";
import dotenv from "dotenv";

dotenv.config();

const debug = debugLib("procuratio:config:database");

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
