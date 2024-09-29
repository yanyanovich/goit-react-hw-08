import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}; // add JWT

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
}; // remove JWT

// POST @ /users/signup
// body: { name, email, password }

export const register = createAsyncThunk("auth/register", async (formData, thunkApi) => {
  try {
    const { data } = await axios.post("/users/signup", formData);
    console.log(data);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// POST @ /users/login
// body: { email, password }

export const login = createAsyncThunk("auth/login", async (formData, thunkApi) => {
  try {
    const { data } = await axios.post("/users/login", formData);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// POST @ /users/logout
// headers: Authorization: Bearer token

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// GET @ /users/me
// headers: Authorization: Bearer token

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    setAuthHeader(persistedToken);
    const { data } = await axios.get("/users/current");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
