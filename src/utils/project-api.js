import sendRequest from "./send-request";

const BASE_URL = "/api/projects";

export function addProjectAPI(data) {
  return sendRequest(`${BASE_URL}/new`, "POST", data);
}

export function getAllProjectsAPI() {
  return sendRequest(BASE_URL);
}
