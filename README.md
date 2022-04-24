### 基于koa2的后端
### 技术栈
##### 后端
- nodejs
- koa2
- mysql
#### 项目说明
- `config` 配置文件目录
  - `default.js` 数据库配置
  - `jwt_config.js` Token配置
- `dao` 数据访问层
  -`DAO.js` 基础数据库访问方法
  -`UserinfoDAO.js` 用户信息数据库访问方法
- `models` 数据库 ORM 模型文件
- `modules` 中间件模块
  - `errorHandle.js` 日志输出配置
  - `passport.js` 基于 passport 模块搭建
- `routes` 统一路由 
- `controller` 处理请求映射
- `services` 服务层，对后台数据进行操作
- `app.js` 主项目入口文件
- `package.json` 项目配置文件