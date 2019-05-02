module.exports = {

  // 本项目的数据库名称
  db: "seven_review",

  // 测试模式下的端口
  dev_port: 1010,

  // 打包后/测试时被代理的端口
  api_port: 1012,


  // ===========================服务器的参数
  // IP登录端口
  login_port: 22,
  // 登录用户名
  user: "cc",
  // 公网IP
  ip: "47.94.202.107",
  // 线上的数据库上传的文件夹
  db_to_olDir: 'db_task/db_from_out',



  // ===========================GAS计划
  // 是否参与
  GAS:true,
  // 线上 GAS 项目的端口
  data_port:8888,
  // 获取地址
  data_api: "/api/week/data.do",

  // 本地测试:IP：localhost
  loc_dev:true,
}
