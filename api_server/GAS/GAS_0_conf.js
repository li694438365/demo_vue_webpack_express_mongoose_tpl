/*
0.本文件用于 配置 提交文件参数的配置；
*/

module.exports = {
  // ===========================GAS计划
  // 是否参与
  GAS: true,
  // 线上 GAS 项目的端口
  data_port: 8888,
  // 获取地址
  data_api: "/api/week/data.do",

  /*是否是 本地测试:
    是：IP==localhost，上限后需改为false
    是：git提交 本地为name ，上限后需改为origin 
  */
  loc_dev: true,



  // ===========================GAS 目标修改文件参数
  // 要修改文件的地址；
  src: '../../src/modules/login/test_data.json',

  // 要修改数据的格式；
  data_tpl: {
    info: 'xF~in78isx',
    ps: 0,
  },

  // 数据总量的上限
  data_max: 100,

  // 超出上限时，缩减为
  data_min: 10,


  // 数据更新时间
  data_interval: 3600 * 1000,

}
