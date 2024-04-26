import { baseAPI } from "./baseAPI";

export const getNotifications = async () => {
  const path = `v1/notification `;
  const res = await baseAPI
    .get(path)
    .then((response) => {
      console.log("Success  -  getNotifications");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  getNotifications");
      return error;
    });

  return res;
};
