import { createSlice } from "@reduxjs/toolkit";
import UpdateAssociationInfo from "../components/updateAssociationInfo";

const initialState = {
  value: { token: null, email: null, favorites: [], associations: [], associationBeingUpdated: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
    },
    signin: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.firstname = null;
      state.value.lastname = null;
    },
    addAssociation: (state, action) => {
      state.value.associations.push(action.payload);
    },
    liked: (state, action) => {
      const existingIndex = state.value.favorites.findIndex((fav) => fav._id === action.payload._id);
      if (existingIndex === -1) {
        state.value.favorites = [...state.value.favorites, action.payload];
      } else {
        state.value.favorites = state.value.favorites.filter(fav => fav._id !== action.payload._id);
      }
    },
    addInfoProfile: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    saveAssociationForUpdate: (state, action) => {
      state.value.associationBeingUpdated = action.payload;
    },
  },
});

export const { signup, signin, logout, addAssociation, liked, addInfoProfile, saveAssociationForUpdate } = userSlice.actions;
export default userSlice.reducer;
