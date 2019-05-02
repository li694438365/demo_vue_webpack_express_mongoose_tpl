/*
GAS 计划的 入口文件
*/

  // 启动自动GitHub AS服务

  var GAS_1_data_week_get = require('./GAS_1_data_week_get.js');
  // 第一阶段：获取数据
  new GAS_1_data_week_get()
  .init(function () {
  	
  });