import Task from "../models/taskModel.js";
import sendResponse from "../config/sendResponseHelper.js";
import debugLib from "debug";

const debug = debugLib("procuratio:controllers:tasksCtrl");

export function createTask(req, res) {
  debug("req.body: %o", req.body);
  const {
    sitePath,
    task,
    status,
    type,
    priority,
    completedDate,
    api,
    apiMethod,
    remarks,
  } = req.body;

  if (
    sitePath === "" ||
    task === "" ||
    status === "" ||
    type === "" ||
    priority === ""
  ) {
    return sendResponse(res, 400, null, "Missing or invalid input data");
  }

  try {
    const postInfo = {
      sitePath,
      task,
      status,
      type,
      priority,
      completedDate,
      api,
      apiMethod,
      remarks,
    };
    debug("req", req.user);
    const newPost = Task.create({
      ...postInfo,
      user: req.user._id,
    });
    sendResponse(res, 201, {
      post: newPost,
    });
  } catch (err) {
    debug("Error saving: %o", err);
    if (err.name === "ValidationError") {
      const errors = {};
      debug("Error saving errors:", err.errors);
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      const errorMessage = Object.keys(errors)[0];
      return sendResponse(res, 400, null, errors[errorMessage]);
    }
    sendResponse(res, 500, null, "Error creating post");
  }
}
