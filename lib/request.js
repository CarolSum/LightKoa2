let url = require('url');
module.exports = {
  // 对原生request进行封装
  
  // getters
  get query() {
    return url.parse(this.req.url, true).query;
  }

  // setters
}