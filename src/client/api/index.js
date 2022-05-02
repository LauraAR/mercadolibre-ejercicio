import { createAsyncThunk } from '@reduxjs/toolkit';

import request from './request';

export const getItems = createAsyncThunk('getItems', async (search) => {
  try {
    const { data } = await request.get(`sites/MLA/search?q=${search}`);
    return data.results;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const getItem = createAsyncThunk('getItem', async (id) => {
  try {
    const { data } = await request.get(`items/${id}`);
    return data;
  } catch (error) {
    throw error.response.data.error;
  }
});
