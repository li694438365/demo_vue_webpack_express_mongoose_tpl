/*
0.本文件用于 配置 提交文件参数的配置；
*/

module.exports = {

  // 要修改文件的地址；
  src: '../../src/modules/login/test_data.json',

  // 要修改数据的格式；
  data_tpl: {
    info: 'xF~in78isx',
    ps: 0,
  },

  // 数据总量的上限
  data_max:100,

  // 超出上限时，缩减为
  data_min:10,


  // 数据更新时间
  data_interval:3600*1000,
}
