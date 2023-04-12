import { client } from "./../utils/client";

const getNotices = async () => {
  const result = await client
    .get(`/notification`)
    .then((response) => response.data.responses)
    .catch((error) => error.response);
  return result;
};
const checkNotice = async (data) => {
  const result = await client
    .get(`/notification/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
const deleteNotice = async (data) => {
  const result = await client
    .delete(`/notification/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
export { getNotices, checkNotice, deleteNotice };
