import { lazy } from 'react';
import { loadData as loadDataForItemList } from './pages/ItemList';
import { loadData as loadDataForItem } from './pages/Item';

const Home = lazy(() => import('./pages/Home'));
const ItemList = lazy(() => import('./pages/ItemList'));
const Item = lazy(() => import('./pages/Item'));
const NotFound = lazy(() => import('./pages/NotFound'));

const routes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/items/search=:search',
    element: ItemList,
    loadData: loadDataForItemList,
  },
  {
    path: '/items/:id',
    element: Item,
    loadData: loadDataForItem,
  },
  {
    path: '*',
    element: NotFound,
  },
];

export default routes;
