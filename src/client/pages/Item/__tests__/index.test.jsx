import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { render, screen, waitFor } from 'test-utils/render';
import Item from '../index';

test('render <Item />', async () => {
  render(
    <Routes>
      <Route path='/items/:id' element={<Item />} />
    </Routes>,
    { useRouter: true, path: '/items/MLA899362191' },
  );

  expect(screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument();

  await waitFor(() => screen.findByRole('list'), { timeout: 1000 });

  const ul = await screen.findByRole('list');

  expect(ul).toBeInTheDocument();
});
