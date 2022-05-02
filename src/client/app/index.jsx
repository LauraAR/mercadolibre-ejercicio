import React, { memo, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';

import appConfig from 'configs/client';
import routes from 'client/routes';
import Loading from 'client/components/Loading';
import { makeId } from 'client/utils/string';

const SearchBar = React.lazy(() => import('client/components/SearchBar'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Helmet {...appConfig.seo} encodeSpecialCharacters={__SERVER__} />

    <SearchBar />

    <main>
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route path={path} element={<Element />} key={makeId()} />
        ))}
      </Routes>
    </main>
  </Suspense>
);

export default memo(App);
