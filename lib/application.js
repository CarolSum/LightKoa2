let http  = require('http');
class Application {
  constructor(){
    this.callbackFunc;
  }

  listen(port, callback){
    let server = http.createServer(this.callback());
    server.listen(port);
    callback();
  }

  use(fn) {
    this.callbackFunc = fn;
  }

  callback(){
    return (req, res) => {
      this.callbackFunc(req, res);
    }
  }
}

module.exports = Application;