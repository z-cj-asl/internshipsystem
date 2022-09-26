const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const serverport = 'http://localhost:3001'//服务器运行的地址
  app.use(
    '/login',
    createProxyMiddleware({
      target: serverport,//服务器运行的地址
      changeOrigin: true,
    })
  );

  app.use(
    '/sign',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/saveuserdata',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/releasetopic',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/obtaintopiclist',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/applytopic',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/applylist',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/mytopiclist',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/applydecide',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/topicnameToTopicdata',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/discussrelease',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/obtaindiscuss',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/obtaintopicmembers',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/taskrelease',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/obtaintasklist',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/deletemember',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/evaluatetelease',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/certificaterelease',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/obtainevaluatelist',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  app.use(
    '/obtaincertificatelist',
    createProxyMiddleware({
      target: serverport,
      changeOrigin: true,
    })
  );

  // app.use(
  //   '/findcreator',
  //   createProxyMiddleware({
  //     target: serverport,
  //     changeOrigin: true,
  //   })
  // );

  
};
