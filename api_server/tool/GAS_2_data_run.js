/*
2.该文件用于 用获取后的数据进行提交；
*/


// GAS 计划 本项目数据
var GAS_Data = require('../../api_server/collection/GAS_data_week.js');

// GAS 计划 本项目配置
var GAS_conf = require('./GAS_0_conf.js');


function Module() {
  var me = this;
}
Module.prototype = {
	init:function (cb) {
		/* body... */

		cb&&cb();
	}

};


module.exports = Module;