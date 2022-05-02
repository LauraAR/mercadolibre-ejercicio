import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

const renderHtml = (head, canonical, extractor, markup, initialState = {}) => {
  let googleMetaTag = '';

  if (process.env.GOOGLE_SITE_VERIFICATION) {
    googleMetaTag = `<meta name="google-site-verification" content="${process.env.GOOGLE_SITE_VERIFICATION}" />`;
  }

  const html = `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="msapplication-TileColor" content="#ffffff">
        
        <meta name="theme-color" content="#ffffff">
        <link rel="canonical" href="${canonical}" />
        
        ${googleMetaTag}

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        
        <!-- Insert bundled styles into <link> tag -->
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body ${head.bodyAttributes.toString()}>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        <div id="app">${markup}</div>

        <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>

        <!-- Insert bundled scripts into <script> tag -->
        ${extractor.getScriptTags()}

        ${head.script.toString()}
      </body>
    </html>
  `;

  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };

  return __DEV__ ? html : minify(html, minifyConfig);
};

export default renderHtml;
