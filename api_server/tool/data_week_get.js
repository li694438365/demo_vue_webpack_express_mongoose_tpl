/*
该文件用于 获取GAS 项目的 大周期数据，以计算出自己的当日的数据；
*/

var http = require("http");

// 配置项
var conf = require('../../conf.js');

// 全局数据
var Data = require('../../api_server/collection/data_week.js');

// 公共数据
var FN = require('./common.js');


// 全局工具
var Tool = require('../../tool.js');
var tool = new Tool();


var opt = {
  host: (conf.loc_dev ? 'localhost' : conf.ip),
  port: conf.data_port,
  method: 'POST',
  path: conf.data_api,
  headers: {
    "Content-Type": 'application/json',
  }
};

function Module() {
  var me = this;


}
Module.prototype = {
  init: function() {
    var me = this;

    // 获取数据
    me._data_get(function() {
      // 数据过滤
      me._data_filter();
    });
  },
  // 获取数据
  _data_get: function(cb) {
    var me = this;
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
    // console.log(Data);
    // return;

    // 获取当前时间戳
    var timestamp = Date.parse(new Date());
    // 
    var path = require('path');

    // 要提交的目录
    var _url = path.join(__dirname, '../../');

    
    tool
      ._cmd(`git pull name master`)
      .then(function() {
        return tool._cmd(`git add ${_url}`);
      })
      .then(function() {
        return tool._cmd(`git commit -m "date:${tool._date(timestamp)}"`);
      })
      .then(function() {
        return tool._cmd(`git push -u name master`)
      })
      .then(function() {
        console.log('上传git完成');
      });
  },





};


module.exports = Module;
