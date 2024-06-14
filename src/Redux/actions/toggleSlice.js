import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    toggles: {},
  },
  reducers: {
    clickToggle: (state, action) => {
      const id = action.payload
      state.toggles[id] = !state.toggles[id]
    },
    hoverEnableToggle : (state, action) => {
      const id = action.payload
      state.toggles[id] = true
    },
    hoverDisableToggle : (state, action) => {
      const id = action.payload
      state.toggles[id] = false
    }
  },
});

export const { clickToggle, hoverEnableToggle, hoverDisableToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
