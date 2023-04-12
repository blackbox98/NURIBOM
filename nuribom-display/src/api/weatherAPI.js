import { client } from "../utils/client";

const getWeather = async (dateString) => {
    const result = await client
      .post('/weather', {
        "base_date": dateString,
        "nx": "66",
        "ny": "100"
      })
      .then((res) => res.data)
      .catch((error) => error.response)
    return result;
  };
  
export { getWeather };
