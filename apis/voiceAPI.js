import { baseAPI } from "./baseAPI";

export const putVoiceCommand = async (data) => {
  const path = `v1/voicecmd`;
  const res = await baseAPI
    .put(path, data)
    .then((response) => {
      console.log("Success  -  putVoiceCommand");
      return response.data;
    })
    .catch((error) => {
      console.log("Fail  -  putVoiceCommand");
      return error;
    });

  return res;
};
