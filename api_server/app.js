var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var conf = require('../conf.js');
// var email = require('./tool/email.js');
process.env.NODE_ENV =process.env.NODE_ENV||"process.env.NODE_ENV";

// =====================================================连接数据库
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/' + conf.db);
// // 链接数据库
// mongoose.connection.once('open', function() {
//   console.log('数据库已连接');
// });




// =====================================================API
// 提供所有的API
function API(app) {
  
  // post应该放在内部，不然就没有设置post
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // 用户
  var user_api = require('./modules/user_api.js');
  new user_api(app).init();

  // 用户
  var plan_api = require('./modules/plan_api.js');
  new plan_api(app).init();

}


// dev：
// 测试模式 需要 引入静态文件
if (process.env.NODE_ENV == 'dev') {
  // 
  module.exports = function(app) {
    API(app);
  };
}
// build 后的正式环境 或 正式环境；
else {
  // 提供静态文件
  app.use(express.static(path.join(__dirname, '../webapp/')));

  // 提供api服务
  API(app);

  // 启动自动GitHub AS服务
  // new email().init();
  var data_week_get = require('./tool/data_week_get.js');
  new data_week_get().init();

  app.listen(conf.api_port);
  console.log('build app服务 ' + conf.api_port);
}
