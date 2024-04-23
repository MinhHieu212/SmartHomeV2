import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

export const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoiceMessage: (state, action) => {
      state.message = action.payload;
    },
    removeVoiceMessage: (state) => {
      state.message = "";
    },
    updateVoiceMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const selectMessage = (state) => state.voice.message;

export const { setVoiceMessage, removeVoiceMessage, updateVoiceMessage } =
  voiceSlice.actions;

export default voiceSlice.reducer;
