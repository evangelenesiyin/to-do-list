import { addPostAPI } from "./task-api";

export async function addPostService(postData) {
  const postItem = await addPostAPI(postData);
  return postItem.data.post;
}
