/*
1.该文件用于 获取GAS 项目的 大周期数据，以计算出自己的当日的数据；
*/



// 全局 配置项
var conf = require('../../conf.js');

// GAS 项目的全局数据
var Data = require('../../api_server/collection/GAS_data_week.js');
// GAS 的局部配置；
var GAS_conf = require('./GAS_0_conf.js');

// 公共 函数
var FN = require('./common.js');






function Module() {
  var me = this;
}
Module.prototype = {
  init: function(cb) {
    var me = this;

    // 执行一次
    me.init_once(cb);

    // 开启 24 小时 循环
    setInterval(function(argument) {
      me.init_once(cb);
    }, GAS_conf.data_interval);
  },
  init_once: function(cb) {
    var me = this;
    // 获取数据
    me._data_get(function() {

      // 数据过滤
      me._data_filter();

      // 执行下面的步骤；
      cb && cb();
    });
  },



  // 获取数据
  _data_get: function(cb) {
    var me = this;

    // 用于做请求
    var http = require("http");

    // 请求的一些参数
    var opt = {
      host: (conf.loc_dev ? 'localhost' : conf.ip),
      port: conf.data_port,
      method: 'POST',
      path: conf.data_api,
      headers: {
        "Content-Type": 'application/json',
      }
    };

    // 
    var req = http
      .request(opt, function(res) {
        //设置格式
        res.setEncoding('utf8');

        // 要接受的字符串
        var data_str = '';

        // 开始接收数据
        res.on('data', (chunk) => {
          data_str += chunk;
        });

        //监听end事件，响应结束时弹出提示
        res.on('end', () => {
          var data_obj = JSON.parse(data_str);
          // 全局赋值
          Data.week = JSON.parse(data_obj.week);

          opt = null;

          // 
          cb && cb();



        });
      })
      // 
      .on('error', function(e) {

      });

    req.end();
  },
  // 处理数据
  _data_filter: function() {
    // 当前的日期
    Data._date = FN.formatterDateDay(new Date(), 1);
    Data.week.forEach(function(ele, index) {
      if (ele.date == Data._date) {
        Data._github = ele.key;
        Data._numb = ele.pull_numb;
        return;
      }
    });
  },





};


module.exports = Module;
