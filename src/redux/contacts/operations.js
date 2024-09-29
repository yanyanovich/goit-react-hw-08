import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkApi) => {
  try {
    const { data } = await axios.get("/contacts");
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkApi) => {
  try {
    const { data } = await axios.delete(`/contacts/${contactId}`);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkApi) => {
  try {
    const { data } = await axios.post("/contacts", contact);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
