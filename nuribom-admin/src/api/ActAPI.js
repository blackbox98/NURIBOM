import { client } from "./../utils/client";

const registAct = async (data) => {
  const result = await client
    .post(`/actsuggest`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getActList = async (data) => {
  const result = await client
    .get(`/actsuggest/users/${data}`)
    .then((response) => response.data.responses)
    .catch((error) => error.response);
  return result;
};

const deleteAct = async (data) => {
  const result = await client
    .delete(`/actsuggest/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getActDetail = async (data) => {
  const result = await client
    .get(`/actsuggest/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const updateAct = async (data) => {
  const result = await client
    .put(`/actsuggest/${data.actId}`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
export { registAct, getActList, deleteAct, getActDetail, updateAct };
