/*
1.该文件用于 GAS_1_data_week_get.js 文件获取数据的本地对象户储存；
*/


// 我们所有的数据放在全局变量内
module.exports = {
  // 一周确认的数据 
  week: [],

  // 当前的日期
  _date:'',

  // 当前日期是否要提交，
  _github:0,

  // 当前日期提交的条数
  _numb:0,
};