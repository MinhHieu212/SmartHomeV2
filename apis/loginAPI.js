import { baseAPI } from "./baseAPI";

export const LoginAPI = async (data) => {
  const responseLogin = await baseAPI
    .post("/v1/user/login", data)
    .then((response) => {
      console.log("Success  -  LoginAPI");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  LoginAPI");
      return error;
    });

  return responseLogin;
};
