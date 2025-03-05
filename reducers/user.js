import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, email: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },
    signin: (state, action) => {
      state.value.token = action.payload.token;
      // state.value.email = action.payload.email;
    },
  },
});

export const { signup, signin } = userSlice.actions;
export default userSlice.reducer;
