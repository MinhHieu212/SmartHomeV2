import {baseAPI} from "./baseAPI";

export const getDoor = async () => {
    const path = "/v1/device/general-information?isAll=false&device_id=2";
    const res = await baseAPI
        .get(path)
        .then((response) => {
            console.log("Success -  getDoor");
            return response.data;
        })
        .catch((error) => {
            console.log("Fail - getDoor");
            return error;
        });
    return res;
}