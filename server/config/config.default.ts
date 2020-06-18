/*
 * @Author: sky
 * @Date: 2019-11-26 10:11:41
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 15:48:56
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  // add your special config in here
  const bizConfig = {
    // token 凭证
    jwtSecret: 'xazlmx',
    // token 过期时间 60, "2 days", "10h", "7d"
    tokenExp: '7d'
  };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574734226119_237';

  // add your egg config in here
  config.middleware = [ 'errorHandler' ];

  // 异常捕获路由
  config.errorHandler = {
    match: [ '/api' ]
  };

  // port config
  config.cluster = {
    listen: {
      port: 7001
    }
  };

  // mysql config
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'fsxy'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  // 关闭安全威胁csrf的防范
  config.security = {
    csrf: {
        enable: false,
    }
  };

  // 解决跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
  };

  // 上传文件限制配置
  config.multipart = {
    mode: 'stream',
    whitelist: ['.png', '.jpg', '.jpeg', '.xls', '.xlsx'],
    fileSize: '20mb'
  };

  // 七牛云配置
  config.qiniu = {
    accessKey: 'Your Qiniu AccessKey',
    secretKey: 'Your Qiniu secretKey',
    bucket_name: 'fsxy',
    bucket_domain: 'Your Qiniu Domain'
  };

  // app config
  config.app = {
    uuid: 'j9KwqeTfG7WXW1q4oEUqk9w2lAGUVdUf',
    headImages: ['http://qbcpt1i36.bkt.clouddn.com/head1.jpeg', 'http://qbcpt1i36.bkt.clouddn.com/head2.png',
    'http://qbcpt1i36.bkt.clouddn.com/head3.png', 'http://qbcpt1i36.bkt.clouddn.com/head4.jpg',
    'http://qbcpt1i36.bkt.clouddn.com/head5.jpg', 'http://qbcpt1i36.bkt.clouddn.com/head6.jpg',
    'http://qbcpt1i36.bkt.clouddn.com/head7.jpg', 'http://qbcpt1i36.bkt.clouddn.com/head8.jpg',
    'http://qbcpt1i36.bkt.clouddn.com/head9.jpg', 'http://qbcpt1i36.bkt.clouddn.com/head10.jpeg']
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
