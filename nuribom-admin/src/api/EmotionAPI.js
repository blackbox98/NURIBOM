import { client } from "./../utils/client";

const getUserTodayEmotion = async (data) => {
  const result = await client
    .get(`/emotion/${data}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};
const getUserEmotionList = async (data) => {
  const result = await client
    .get(`/emotion/list/${data}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

export { getUserTodayEmotion, getUserEmotionList };
