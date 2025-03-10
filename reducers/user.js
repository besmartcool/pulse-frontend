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
      state.value.associations.push(action.payload);
    },
    liked: (state, action) => {
      const index = state.value.favorites.findIndex((fav) => fav.id === action.payload.id);
      if (index === -1) {
        state.value.favorites.push(action.payload);
      } else {
        state.value.favorites = state.value.favorites.filter(fav => fav.id !== action.payload.id);
      }
    },
    addInfoProfile: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { signup, signin, addAssociation, liked, addInfoProfile } = userSlice.actions;
export default userSlice.reducer;
