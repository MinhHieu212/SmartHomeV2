import { baseAPI } from "./baseAPI";

export const getHistory = async () => {
    const path = "/v1/logs";
    const res = await baseAPI
        .get(path)
        .then((response) => {
            console.log("Success  -  getHistory");
            return response.data;
        })
        .catch((error) => {
            console.log("Fail  -  getHistory");
            return error;
        });
    return res;
};
