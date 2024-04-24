import { baseAPI } from "./baseAPI";

export const getAllDivice = async () => {
  const path = "/v1/device/general-information?isAll=true";
  const responseLogin = await baseAPI
    .get(path)
    .then((response) => {
      // console.log("Success  -  getAllDivice");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  getAllDivice");
      return error;
    });

  return responseLogin;
};

export const getSingleDivice = async (device_id) => {
  const path = `/v1/device/general-information?isAll=true&device_id=${device_id}`;
  const responseLogin = await baseAPI
    .get(path)
    .then((response) => {
      // console.log("Success  -  getSingleDivice");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  getSingleDivice");
      return error;
    });

  return responseLogin;
};

export const updateDeviceState = async (putData) => {
  const path = `/v1/device/details`;
  const responseLogin = await baseAPI
    .put(path, putData)
    .then((response) => {
      console.log("Success  -  updateDeviceState");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  updateDeviceState");
      return error;
    });

  return responseLogin;
};
