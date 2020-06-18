/*
 * @Author: sky
 * @Date: 2019-11-26 10:11:41
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 17:22:19
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  }
};

export default plugin;
