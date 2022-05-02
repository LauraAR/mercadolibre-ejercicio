import React from 'react';
import { render } from 'test-utils/render';

import SearchBar from '../index';

test('render <SearchBar />', () => {
  render(<SearchBar />, { useRouter: true });
});
