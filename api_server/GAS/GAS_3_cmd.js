/*
3.该文件用于 用于操作完成后进行GitHub提交；
*/
var GAS_conf = require('./GAS_0_conf.js');

// 全局工具
var Tool = require('../../tool.js');
var tool = new Tool();

function Module() {
  var me = this;
}
Module.prototype = {
  init: function() {
    var me = this;

    // 提交数据
    me._data_push();
  },
  // 提交数据
  _data_push: function(cb) {


    // 获取当前时间戳
    var timestamp = Date.parse(new Date());
    // 
    var path = require('path');

    // 要提交的目录
    var _url = path.join(__dirname, '../../');


    var _name = GAS_conf.loc_dev ? 'name' :'origin';
    
    tool
      ._cmd(`git pull ${_name} master`)
      .then(function() {
        return tool._cmd(`git add ${_url}`);
      })
      .then(function() {
        return tool._cmd(`git commit -m "date:${tool._date(timestamp)}"`);
      })
      .then(function() {
        return tool._cmd(`git push -u ${_name} master`)
      })
      .then(function() {
        console.log('上传git完成');

        cb&&cb();
      });
  },

};


module.exports = Module;
