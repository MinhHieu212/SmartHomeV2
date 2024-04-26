import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newNotice: true,
};

export const notificationSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNewNotice: (state, action) => {
      state.newNotice = action.payload;
    },
  },
});

export const selectNewNotice = (state) => state.notice.newNotice;

export const { setNewNotice } = notificationSlice.actions;

export default notificationSlice.reducer;
