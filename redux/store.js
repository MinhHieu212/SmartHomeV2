import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./deviceSlice/deviceSlice";
import voiceReducer from "./voiceSlice/voiceSlide";
import notificationReducer from "./notificationSlice/notificationSlice";

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    voice: voiceReducer,
    notice: notificationReducer,
  },
});
