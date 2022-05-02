import { resolve } from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import serve from 'serve-static';

import render from '../render';

const app = express();

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(serve(resolve(process.cwd(), 'public')));

/* istanbul ignore next */
const websocketServerCreator = __DEV__ ? require('./websocket-server-creator').default : undefined;
const webpackMiddleware = __DEV__ ? require('../middlewares/webpack.middleware').default : undefined;

/* istanbul ignore next */
if (typeof webpackMiddleware === 'function') {
  const ws = websocketServerCreator(app);

  app.use(webpackMiddleware(ws));
}

app.get('/api/health', (req, res) => res.status(200).end());

app.get('/api/items/search=:search', (req, res) => {
  const { search } = req.params;
  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`).then((response) =>
    res.json({
      success: true,
      items: response,
    }),
  );
  return res;
});

app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  fetch(`https://api.mercadolibre.com/items/${id}`).then((response) =>
    res.json({
      success: true,
      items: response,
    }),
  );
  return res;
});

app.get(/^(?!.*^\/api\/)(.*)/, render);

app.use((req, res, _next) =>
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.path}`,
  }),
);

app.listen(3000, () => console.log('server started htpp://localhost:3000'));

export default app;
