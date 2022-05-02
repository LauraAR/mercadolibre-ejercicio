<h1 align="center">Mercado libre ejercicio</h1>

## Prerequisites

- [Node.js](https://nodejs.org/en/download/): `^14.17.0` or `>=16.0.0`

## Getting Started

```sh
git clone https://github.com/LauraAR/mercadolibre-ejercicio

yarn install # or npm install

yarn dev # or npm run dev
```

## Features

- [React](https://reactjs.org) - A JavaScript library for building user interfaces.
- [Redux](https://redux.js.org) - A Predictable State Container for JS Apps.
- [Redux Toolkit](https://redux-toolkit.js.org) - The official, opinionated, batteries-included toolset for efficient Redux development.
- [React Router](https://github.com/remix-run/react-router) - Declarative routing for React.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.
- [Webpack](https://webpack.js.org) - App bundling.
- [SWC](https://swc.rs) - A super-fast compiler written in rust, producing widely-supported javascript from modern standards and typescript.
- [React Refresh](https://github.com/facebook/react/tree/main/packages/react-refresh) - Fast refresh components without losing their state.
- [react-helmet](https://github.com/nfl/react-helmet) - A document head manager for React.
- [react-helmet-async](https://github.com/staylor/react-helmet-async) - Thread-safe Helmet for React 16+ and friends.
- [loadable-component](https://github.com/gregberge/loadable-components) - The recommended Code Splitting library for React.
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from `.env` for nodejs projects.
- [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware) - Serves the files emitted from webpack over the Express server.
- [Webpack Hot Middleware](https://github.com/webpack-contrib/webpack-hot-middleware) - Allows you to add hot reloading into the Express server.
- [ESLint](https://eslint.org) - Find and fix problems in your JavaScript code.
- [Prettier](https://prettier.io/) - Format code and style.
- Integrate [Jest](https://jestjs.io/) with [Supertest](https://github.com/visionmedia/supertest), [Nock](https://github.com/nock/nock) and [React Testing Library](https://github.com/testing-library/react-testing-library) as the solution for writing unit tests with code coverage support.

## Scripts

| Script         | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `dev`          | Runs your app on the development server at `localhost:9090`. HMR will be enabled. |
| `build`        | Bundles both server-side and client-side files.                                   |
| `build:server` | Bundles server-side files in production mode and put it to the `build`.           |
| `build:client` | Bundles client-side files in production mode and put it to the `public`.          |
| `start`        | Runs your app after bundled.                                                      |
| `test`         | Runs testing.                                                                     |

## Configurations

You can store your configurations in `src/configs/client.js` for client-side, `src/configs/server.js` for server-side. `src/configs/constants.js` is for constants.

You can access the correct configuration with:

```js
import configs from 'configs/client'; // for client-side
import configs from 'configs/server'; // for server-side
import constants from 'configs/constants';

// ...
```
