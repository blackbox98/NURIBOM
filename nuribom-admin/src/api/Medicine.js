import { client } from "./../utils/client";

const registMedication = async (data) => {
  const result = await client
    .post(`/medication`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getUserMedicationList = async (data) => {
  const result = await client
    .get(`/medication/lists/${data}`)
    .then((response) => response.data.responses)
    .catch((error) => error.response);
  return result;
};

const getMedicationDetail = async (data) => {
  const result = await client
    .get(`/medication/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const deleteMedication = async (data) => {
  const result = await client
    .delete(`/medication/${data}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const updateMedication = async (data) => {
  const result = await client
    .put(`/medication/${data.medicationId}`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

export {
  registMedication,
  getUserMedicationList,
  deleteMedication,
  getMedicationDetail,
  updateMedication,
};
