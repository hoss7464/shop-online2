import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../actions/counterSlice";
import toggleReducer from "../actions/toggleSlice";
import simpleFormReducer from "../actions/simpleFormSlice";
import filterReducer from "../actions/filterSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toggle: toggleReducer,
    simpleForm: simpleFormReducer,
    filterProduct : filterReducer
  },
});
