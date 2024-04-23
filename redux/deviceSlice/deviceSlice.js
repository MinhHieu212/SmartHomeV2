import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  runningDevicesCount: 0,
  devicesInfomation: [],
};

const countDevicesRunning = (devicesInfomation) => {
  return devicesInfomation.reduce((count, device) => {
    if (device.state === true) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevicesInfomation: (state, action) => {
      // action.payload is a list of devices [{} , {}]
      state.devicesInfomation = action.payload;
      state.runningDevicesCount = countDevicesRunning(state.devicesInfomation);
    },

    updateDevicesInfomation: (state, action) => {
      // action.payload is object {name , state}
      const updatedDevicesInfomation = state.devicesInfomation.map((obj) => {
        if (obj.name == action.payload.name) {
          return { ...obj, state: action.payload.state };
        } else {
          return obj;
        }
      });

      state.devicesInfomation = updatedDevicesInfomation;
      state.runningDevicesCount = countDevicesRunning(state.devicesInfomation);
    },
  },
});

// Action creators are generated for each case reducer function
export const setlectAllDevicesInfomation = (state) =>
  state.device.devicesInfomation;

export const setlectRunningDevicesCount = (state) =>
  state.device.runningDevicesCount;

export const setlectSingleDeviceInfomation = (state, name) =>
  state.device.devicesInfomation.find((item) => item.name === name);

export const { setDevicesInfomation, updateDevicesInfomation } =
  deviceSlice.actions;

export default deviceSlice.reducer;
