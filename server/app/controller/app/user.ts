/*
 * @Author: sky
 * @Date: 2019-08-25 21:10:41
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-13 09:14:00
 */
import { Controller } from 'egg';
import returnData from '../../utils/returnData';

export default class AppUserController extends Controller {
  /**
   * @description: 登录
   */
  public async login() {
    const { ctx, app, service } = this;
    const { username, password } = ctx.request.body;
    const { uuid } = app.config.app;
    const user = await service.app.user.login(username, password);

    if (!user) {
        ctx.body = returnData(400, '账号或密码错误');
        return;
    }

    ctx.body = returnData(200, 'success', {
        id: user.id,
        uuid
    });
  }

  /**
   * @description: 注册
   */
  public async register() {
    const { ctx, service } = this;
    const result = await service.app.user.register(ctx.request.body);

    if (!result) {
        ctx.body = returnData(400, '请输入正确信息');
        return;
    }

    ctx.body = returnData(200, 'success');
  }
  
  /**
   * @description: 查询用户信息
   */
  public async getUserInfo() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const result = await service.app.user.getUserInfo(id);

    if (!result) {
        ctx.body = returnData(400, '很抱歉没有找到此用户');
        return;
    }

    ctx.body = returnData(200, 'success', result);
  }
}