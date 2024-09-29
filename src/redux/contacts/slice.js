import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "../../redux/contacts/operations";
//import { logout } from "../auth/operations";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,

  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),

  // .addCase(logout.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  // })
  // .addCase(logout.fulfilled, (state) => {
  //     state.items = [];
  //     state.loading = false;
  //     state.error = null;
  // })
  // .addCase(logout.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  // }),
});

export const contactsReducer = contactsSlice.reducer;
