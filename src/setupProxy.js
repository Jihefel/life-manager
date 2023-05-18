const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

  // Proxy pour l'API Delhaize
  app.use(
    "/api/delhaize",
    createProxyMiddleware({
      target: "https://www.delhaize.be",
      changeOrigin: true,
      pathRewrite: {
        "^/api/delhaize": "/api/v1",
      },
    })
  );

  // Proxy pour l'API Carrefour
  app.use(
    "/api/carrefour",
    createProxyMiddleware({
      target: "https://api.carrefour.be",
      changeOrigin: true,
      pathRewrite: {
        "^/api/carrefour": "/v2/eshop",
      },
    })
  );

  // Proxy pour l'URL Collect&Go
  app.use(
    "/api/collectandgo",
    createProxyMiddleware({
      target: "https://www.collectandgo.be",
      changeOrigin: true,
      pathRewrite: {
        "^/api/collectandgo": "/ProductDisplay",
      },
    })
  );
};
