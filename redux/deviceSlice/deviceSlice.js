import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeReload: 5000,
  runningDevicesCount: 0,
  devicesInfomation: [
    {
      _id: "660bbc1f5ff8e39254110d8e",
      device_id: 3,
      name: "Living Room Light",
      state: false,
      type: "light",
      schedule: [],
      updatedAt: "2024-04-24T07:06:34.824Z",
      topic: "living-room-light",
    },
    {
      _id: "660bbc375ff8e39254110d91",
      device_id: 4,
      name: "Kitchen Light",
      state: false,
      type: "light",
      schedule: [],
      updatedAt: "2024-04-24T07:06:35.549Z",
      topic: "kitchen-light",
    },
    {
      _id: "660d266df45f00cdf91353fc",
      device_id: 1,
      name: "Living Room Fan",
      state: false,
      level: 1,
      type: "fan",
      isAuto: false,
      updatedAt: "2024-04-24T07:00:43.129Z",
      schedule: [],
      topic: "fan",
    },
    {
      _id: "660d2696f45f00cdf91353fe",
      device_id: 2,
      name: "Front Door",
      state: false,
      mode: "auto",
      isAuto: true,
      type: "door",
      close_time: 33,
      updatedAt: "2024-04-24T07:02:27.325Z",
      topic: "door",
      schedule: [],
    },
  ],
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
      // action.payload is object {name , data}
      const updatedDevicesInfomation = state.devicesInfomation.map((obj) => {
        if (obj.name == action.payload.name) {
          return { ...obj, ...action.payload.data };
        } else {
          return obj;
        }
      });

      state.devicesInfomation = updatedDevicesInfomation;
      state.runningDevicesCount = countDevicesRunning(state.devicesInfomation);
    },

    setTimeReLoad: (state, action) => {
      console.log("setTimeReLoad call in Redux", action.payload);
      state.timeReload = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const setlectAllDevicesInfomation = (state) =>
  state.device.devicesInfomation;

export const selectTimeReLoad = (state) => state.device.timeReload;

export const setlectRunningDevicesCount = (state) =>
  state.device.runningDevicesCount;

export const setlectSingleDeviceInfomation = (state, name) =>
  state.device.devicesInfomation.find((item) => item.name === name);

export const { setDevicesInfomation, updateDevicesInfomation, setTimeReLoad } =
  deviceSlice.actions;

export default deviceSlice.reducer;
