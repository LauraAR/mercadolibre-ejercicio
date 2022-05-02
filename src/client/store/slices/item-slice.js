import { createSlice } from '@reduxjs/toolkit';
import { getItem } from 'client/api';
import { STATUS } from 'configs/constants';

const itemSlice = createSlice({
  name: 'item-slice',
  initialState: {},
  reducers: {
    checkItemExist: (state, { payload }) => {
      state[payload] = { loading: STATUS.IDLE };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItem.pending, (state, { meta: { arg } }) => {
        state[arg].loading = STATUS.LOADING;
      })
      .addCase(getItem.rejected, (state, { meta: { arg }, error }) => {
        state[arg].loading = STATUS.FAILED;
        state[arg].error = error;
      })
      .addCase(getItem.fulfilled, (state, { meta: { arg }, payload }) => {
        state[arg].loading = STATUS.SUCCEED;
        state[arg].data = payload;
      });
  },
});

const shouldGetItem = (state, id) => !Object.values(STATUS).includes(state.item[id]?.loading);

export const getItemIfNeed = (id) => (dispatch, getState) => {
  if (shouldGetItem(getState())) {
    dispatch(itemSlice.actions.checkItemExist(id));
    return dispatch(getItem(id));
  }

  return null;
};

export default itemSlice.reducer;
