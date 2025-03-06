import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, email: null, favorites: [], associations: [] },
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
    },
    addAssociation: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { signup, signin, addAssociation } = userSlice.actions;
export default userSlice.reducer;
