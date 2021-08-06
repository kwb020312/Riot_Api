const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/lol/summoner/",
        createProxyMiddleware({
          target: "https://kr.api.riotgames.com",
          changeOrigin: true,
        })
      );
  app.use(
    "/lol/league/",
    createProxyMiddleware({
      target: "https://kr.api.riotgames.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/lol/match/",
    createProxyMiddleware({
      target: "https://asia.api.riotgames.com",
      changeOrigin: true,
    })
  );
};
