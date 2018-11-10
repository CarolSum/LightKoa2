let http  = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');

class Application {
  constructor(){
    this.middlewares = [];
  }

  listen(port, callback){
    let server = http.createServer(this.callback());
    server.listen(port);
    callback();
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  createContext(req, res) {
    let ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  compose() {
    return async ctx => {
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext);
        }
      }
      let len = this.middlewares.length;
      let next = async () => {
        return Promise.resolve();
      };
      for (let i = len - 1; i >= 0; i--){
        let currentMiddleware = this.middlewares[i];
        next = createNext(currentMiddleware, next);
      }
      await next();
    };
  }

  onerror(err, ctx) {
    console.log(err);
    ctx.res.end('Error Detected!');
  }

  callback(){
    return (req, res) => {
      let ctx = this.createContext(req, res);
      // let respond = () => this.responseBody(ctx);
      let onerror = (err) => this.onerror(err, ctx);
      let fn = this.compose();
      return fn(ctx).catch(onerror);
      // return fn(ctx).then(respond).catch(onerror);
    }
  }
}

module.exports = Application;