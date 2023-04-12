import { client } from "./../utils/client";

const registVisit = async (data) => {
  const result = await client
    .post(`/visit`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getUserVisitList = async (data) => {
  const result = await client
    .get(`/visit/users/${data}`)
    .then((response) => response.data.responses)
    .catch((error) => error.response);
  return result;
};

const getVisitDetail = async (data) => {
  const result = await client
    .get(`/visit/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const visitCheck = async (data) => {
  const result = await client
    .get(`/visit/visited/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
const deleteVisit = async (data) => {
  const result = await client
    .delete(`/visit/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
const updateVisit = async (data) => {
  const result = await client
    .put(`/visit/${data.visitId}`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
export {
  registVisit,
  getUserVisitList,
  visitCheck,
  deleteVisit,
  getVisitDetail,
  updateVisit,
};
