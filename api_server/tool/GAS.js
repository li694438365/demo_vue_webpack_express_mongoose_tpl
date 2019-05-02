/*
GAS 计划的 入口文件
*/


// 启动自动GitHub AS服务
var GAS_1_data_week_get = require('./GAS_1_data_week_get.js');
var GAS_3_cmd = require('./GAS_3_cmd.js');

// 第 1 阶段：获取数据
new GAS_1_data_week_get()
  .init(function() {


  	// 第 3 阶段：提交数据
  	new GAS_3_cmd().init();
  });
