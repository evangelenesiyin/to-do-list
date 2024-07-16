import Project from "../models/projectModel.js";
import sendResponse from "../config/sendResponseHelper.js";
import debugLib from "debug";

const debug = debugLib("procuratio:controllers:projectsCtrl");

export function createProject(req, res) {
  debug("req.body: %o", req.body);
  const { projectName } = req.body;

  if (projectName === "") {
    return sendResponse(res, 400, null, "Missing or invalid input data");
  }

  try {
    const projectInfo = {
      projectName,
    };
    debug("req", req.user);
    const newProject = Project.create({
      ...projectInfo,
      user: req.user._id,
    });
    sendResponse(res, 201, {
      project: newProject,
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
    sendResponse(res, 500, null, "Error creating project");
  }
}

export async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({ user: req.user._id }).populate(
      "projectName"
    );
    debug("found all projects: %o", projects);
    sendResponse(res, 200, { projects });
  } catch (err) {
    sendResponse(res, 500, null, "Error fetching all projects");
  }
}
