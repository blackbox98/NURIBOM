import { client } from "./../utils/client";

const signupWorker = async (data) => {
  const result = await client
    .post(`/workers/signup`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const workerWebIDDuplicateCheck = async (data) => {
  const result = await client
    .get(`/workers/idcheck/${data}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const loginWorker = async (data) => {
  const result = await client
    .post(`/workers/login`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getWorker = async () => {
  const result = await client
    .get(`/workers`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};
const updateWorker = async (data) => {
  const result = await client
    .put(`/workers`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};
export {
  signupWorker,
  workerWebIDDuplicateCheck,
  loginWorker,
  getWorker,
  updateWorker,
};
