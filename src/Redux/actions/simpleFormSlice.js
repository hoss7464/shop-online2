import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  forms: {
    form1: { name: "", email: "" },
    form2: { username: "", password: "", confirmPassword: "" },
    loginForm : {email : "", password : ""},
    signupForm : {fullname : "", username : "" , email : "", password : "", confirmPassword : ""}
  },
};

export const submitForm = createAsyncThunk(
  "simpleForm/submitForm",
  async ({ formId, formData }, thunkAPI) => {
    // Example: Simulate an API call
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: formData }), 1000)
    );
    console.log(`Form ${formId} submitted successfully. Response:`, response.data);
    return { formId, data: response.data };
  }
);

export const simpleFormSlice = createSlice({
  name: "simpleForm",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { formId, field, value } = action.payload;
      state.forms[formId][field] = value;
    },
    resetForm: (state, action) => {
      const { formId } = action.payload;
      if (formId === "form1") {
        state.forms[formId] = {name : '', email : ""}
      } else if (formId === "form2") {
        state.forms[formId] = {username: "", password: "", confirmPassword: ""}
      } else if (formId === "loginForm") {
        state.forms[formId] = {email : "", password : ""}
      } else if (formId === "signupForm") {
        state.forms[formId] = {fullname : "", username : "" , email : "", password : "", confirmPassword : ""}
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.fulfilled, (state, action) => {
      const { formId } = action.payload;
      if (formId === "form1") {
        state.forms[formId] = {name : '', email : ""}
      }   else if (formId === "form2") {
        state.forms[formId] = {username: "", password: "", confirmPassword: ""}
      } else if (formId === "loginForm") {
        state.forms[formId] = {email : "", password : ""}
      } else if (formId === "signupForm") {
        state.forms[formId] = {fullname : "", username : "" , email : "", password : "", confirmPassword : ""}
      }
    });
  },
});

export const { updateForm, resetForm } = simpleFormSlice.actions;

export default simpleFormSlice.reducer;

