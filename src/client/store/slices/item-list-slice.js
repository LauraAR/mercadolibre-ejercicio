import { createSlice } from '@reduxjs/toolkit';
import { getItems } from 'client/api';
import { STATUS } from 'configs/constants';

const itemListSlice = createSlice({
  name: 'item-list-slice',
  initialState: {
    loading: STATUS.IDLE,
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.loading = STATUS.LOADING;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = STATUS.FAILED;
        state.error = action.error;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = STATUS.SUCCEED;
        state.items = [].concat(...action.payload);
      });
  },
});

const shouldGetItemList = (state, search) => !Object.values(STATUS).includes(state.item[search]?.loading);

export const getItemListIfNeed = (search) => (dispatch, getState) => {
  if (shouldGetItemList(getState())) return dispatch(getItems(search));

  return null;
};

export default itemListSlice.reducer;
