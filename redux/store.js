import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./deviceSlice/deviceSlice";
import voiceReducer from "./voiceSlice/voiceSlide";

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    voice: voiceReducer,
  },
});
