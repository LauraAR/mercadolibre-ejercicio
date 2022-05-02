import { combineReducers } from '@reduxjs/toolkit';

import itemList from './slices/item-list-slice';
import item from './slices/item-slice';

const reducers = combineReducers({
  itemList,
  item,
});

export default reducers;
