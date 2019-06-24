/*
GAS 计划的 入口文件
*/


// 

// 启动自动GitHub AS服务
var GAS_1_data_week_get = require('./GAS_1_data_week_get.js');
var GAS_2_data_run = require('./GAS_2_data_run.js');




// 第 1 阶段：获取数据
new GAS_1_data_week_get()
  .init(function() {

    // 第 2 阶段：执行本地数据，修改文件，每修改一次就提交一次数据；
    new GAS_2_data_run().init();
  });
