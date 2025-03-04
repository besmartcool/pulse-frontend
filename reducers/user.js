import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: null,
  email: null,
  password: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload;
      state.value.email = action.payload;
      state.value.password = action.payload;
    },
  },
});


export const { login } = userSlice.actions;
export default userSlice.reducer;