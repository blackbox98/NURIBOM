import { client } from "../utils/client";

const getUser = async (data) => {
  const result = await client
    .get(`/users/serialno/${data}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return result;
};

export { getUser };
