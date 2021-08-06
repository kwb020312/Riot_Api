const {createProxyMiddleware} = require('http-proxy-middleware')
    
module.exports = function(app) {
    app.use(createProxyMiddleware('/kr', { target: 'https://kr.api.riotgames.com/' }))
    app.use(createProxyMiddleware('/asia', { target: 'https://asia.api.riotgames.com/' }))
}