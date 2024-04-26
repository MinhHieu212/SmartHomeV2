import { baseAPI } from "./baseAPI";

export const getDashboard = async () => {
  const date = new Date().toISOString().split("T")[0];
  console.log(date);
  const path = "/v1/dashboard?date="+date;
  const responseLogin = await baseAPI
    .get(path)
    .then((response) => {
      console.log("Success - getDashboard");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail - getDashboard");
      return error;
    });
  return responseLogin;
};
