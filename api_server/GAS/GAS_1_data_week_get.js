/*
1.该文件用于 获取GAS 项目的 大周期数据，以计算出自己的当日的数据；
且 开启 24 小时周期 循环数据;
*/



// GAS 项目的全局数据
var GAS_data = require('./GAS_1_data_week_local.js');
// GAS 的局部配置；
var GAS_conf = require('./GAS_0_conf.js');

// 公共 函数
var FN = require('../tool/common.js');


function Module() {
  var me = this;
}
Module.prototype = {
  init: function(cb) {
    var me = this;

    // 是否参与GAS计划；
    if (GAS_conf.GAS) {
      // 执行一次
      me.init_once(cb);

      // 开启 24 小时 循环
      setInterval(function(argument) {
        me.init_once(cb);
      }, GAS_conf.data_interval);
    }

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
      host: "localhost",
      port: GAS_conf.data_port,
      method: 'POST',
      path: GAS_conf.data_api,
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
          GAS_data.week = JSON.parse(data_obj.week);
          // console.log(GAS_data.week);

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
    GAS_data._date = FN.formatterDateDay(new Date(), 1);
    GAS_data.week.forEach(function(ele, index) {
      if (ele.date == GAS_data._date) {
        GAS_data._github = ele.key;
        GAS_data._numb = ele.pull_numb;
        console.log(GAS_data);
        return;
      }
    });
  },





};


module.exports = Module;
