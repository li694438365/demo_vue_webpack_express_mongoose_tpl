/*
0.本文件用于 配置 提交文件参数的配置；
*/

module.exports = {

  // 要修改文件的地址；
  src: '../../src/modules/login/test_data.json',

  // 要修改数据的格式；
  data_tpl: {
    name: 'xx',
    age: 0,
  },

  // 数据总量的上限
  data_max:100,

  // 超出上限时，缩减为
  data_min:10,
}
