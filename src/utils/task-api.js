import sendRequest from "./send-request";

const BASE_URL = "/api/tasks";

export function addPostAPI(postData) {
  return sendRequest(`${BASE_URL}/new`, "POST", postData);
}
