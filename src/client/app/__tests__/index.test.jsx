import React from 'react';

import { render, screen, cleanup } from 'test-utils/render';
import App from '../index';

test('render <App />', async () => {
  render(<App />, { useRouter: true, path: '/items/MLA929590031' });
  cleanup();

  render(<App />, { useRouter: true, path: '/not-found' });
  expect(await screen.findByText('Page not found.')).toBeInTheDocument();
  cleanup();
});
