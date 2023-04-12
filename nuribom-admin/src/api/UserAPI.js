import { client } from "./../utils/client";

const signupUser = async (data) => {
  const result = await client
    .post(`/users`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getUsers = async () => {
  const result = await client
    .get(`/users`)
    .then((response) => response.data.responses)
    .catch((error) => error.response);
  return result;
};

const getUserDetail = async (data) => {
  const result = await client
    .get(`/users/${data}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};
const updateUser = async (data, userId) => {
  const result = await client
    .put(`/users/${userId}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};
const deleteUser = async (data) => {
  const result = await client
    .delete(`/users/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
};
export { signupUser, getUsers, getUserDetail, updateUser, deleteUser };
