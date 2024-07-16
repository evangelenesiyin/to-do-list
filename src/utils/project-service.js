import { addProjectAPI, getAllProjectsAPI } from "./project-api";

export async function addProjectService(data) {
  const projectItem = await addProjectAPI(data);
  return projectItem.data.project;
}

export async function getAllProjectsService() {
  const allProjects = await getAllProjectsAPI();
  const sortedProjects = allProjects.data.project.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return sortedProjects;
}
