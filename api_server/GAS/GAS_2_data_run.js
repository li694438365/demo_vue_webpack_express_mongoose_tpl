/*
2.该文件用于 用获取后的数据进行操作和提交；
*/

// 
var fs = require('fs-extra');
var path = require('path');

// GAS 计划 本项目数据
var GAS_Data = require('./GAS_1_data_week_local.js');

// GAS 计划 本项目配置
var GAS_conf = require('./GAS_0_conf.js');





function Module() {
  var me = this;
}
Module.prototype = {
  init: function(cb) {

    var me = this;
    
    // 今天存在
    if (GAS_Data._github) {
      // 初始化
      me._file_init(0, cb);
    }
  },


  // 文件的初始化工作
  _file_init: function(index, cb) {
    var me = this;
    // 次数 等于 今日次数 递归结束,同时执行回调
    if (index == GAS_Data._numb) {
      cb && cb();
      return;
    }
    // 读取文件
    me._file_read()
      .then(function(data) {

        // 改变文件
        me._file_upd(data);

        // 保存文件
        return me._file_save(data);
      })
      .then(function(res) {
        // console.log(res);
        index++;
        me._file_init(index, cb);
      });
  },
  // 文件读取
  _file_read: function() {
    var me = this;

    return new Promise(function(resolve, reject) {
      fs.readJson(path.join(__dirname, GAS_conf.src))
        .then(function(data) {
          resolve(data);
        })
    });
  },
  // 文件修改
  _file_upd: function(data) {

    // for (var i = 0;i<150;i++) {
    //  data.push({
    //      name: GAS_conf.data_tpl.name +"_"+ Math.random(),
    //      age: GAS_conf.data_tpl.age + Math.random(),
    //    });
    // }


    // 数据没有超过上限
    if (data.length < GAS_conf.data_max) {
      var obj = {};
      for (var key in GAS_conf.data_tpl) {
        obj[key] = GAS_conf.data_tpl[key] + "_" + Math.random();
      }
      data.push(obj);
      obj = null;
    }
    // 超过数据上限
    else {
      data = data.slice(0, GAS_conf.data_min);
    }

    // console.log(data);
  },
  // 文件输出
  _file_save: function(data) {
    var me = this;
    return new Promise(function(resolve, reject) {
      fs.outputJson(path.join(__dirname, GAS_conf.src), data)
        .then(function(res) {
          resolve(res);
        });
    });
  }




  // return new Promise(function (resolve,reject) {
  //      /* body... */
  //     });






};


module.exports = Module;
