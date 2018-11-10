// 从原生response对象读取属性
module.exports = {
  /**
   * 由于可能对body进行多次读取和修改, 没有使用原生this.res.end
   * 真正返回浏览器信息的操作在application.js中进行
   */
  get body() {
    return this._body;
  },
  set body(data) {
    this._body = data;
  },
  get status() {
    return this.res.statusCode;
  },
  set status(statusCode) {
    if (typeof statusCode !== 'number') {
      throw new Error('statusCode typeError');
    }
    this.res.statusCode = statusCode;
  }
};