import { baseAPI } from "./baseAPI";

export const getSensorRecord = async ({ type, isAll }) => {
  const path = `/v1/sensor/values?type=${type}&isAll=${isAll}`;
  const res = await baseAPI
    .get(path)
    .then((response) => {
      console.log("Success  -  getSensorRecord");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  getSensorRecord");
      return error;
    });

  return res;
};
