import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { render, screen, waitFor } from 'test-utils/render';
import ItemList from '../index';

test('render <ItemList />', async () => {
  jest.setTimeout(30000);
  render(
    <Routes>
      <Route path='/items/search=:search' element={<ItemList />} />
    </Routes>,
    { useRouter: true, path: '/items/search=sieger' },
  );

  expect(screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument();

  await waitFor(() => screen.findByRole('list'), { timeout: 60000 });

  const ul = await screen.findByRole('list');

  expect(ul).toBeInTheDocument();
});
