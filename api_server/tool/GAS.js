/*
GAS 计划的 入口文件
*/

  // 启动自动GitHub AS服务
  var data_week_get = require('./tool/GAS_1_data_week_get.js');
  new data_week_get().init();