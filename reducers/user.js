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
    saveAssociationForUpdate: (state, action) => {
      state.value.associationBeingUpdated = action.payload;
    },
  },
});

export const { signup, signin, addAssociation, liked, addInfoProfile, saveAssociationForUpdate } = userSlice.actions;
export default userSlice.reducer;
