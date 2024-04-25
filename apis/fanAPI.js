import { baseAPI } from "./baseAPI";

export const getFan = async () => {
  const path = "/v1/device/general-information?isAll=false&device_id=1";
  const res = await baseAPI
    .get(path)
    .then((response) => {
      console.log("Success  -  getFan");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  getFan");
      return error;
    });
  return res;
};
