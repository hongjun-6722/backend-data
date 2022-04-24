const errMiddleWare = async (ctx, next) => {

  try {
    await next()
  } catch (err) {
    ctx.body = '服务器异常，请稍后！！！'
  }

  //   return next().catch((err) => {
  //     if (err.status === 401) {
  //       ctx.status = 401;
  //       ctx.body = {
  //         error: err.originalError ? err.originalError.message : err.message,
  //       };
  //     } else {
  //       throw err;
  //     }
  //   });

}


module.exports = {
  errMiddleWare
}
