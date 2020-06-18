/*
 * @Author: sky
 * @Date: 2019-08-25 21:10:41
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 08:18:03
 */
import { Controller } from 'egg';
import upload from '../../utils/upload';
import returnData from '../../utils/returnData';

export default class AdminUserController extends Controller {
  /**
   * @description: 登录
   */
  public async login() {
    const { ctx, service } = this;
    const { userName, password } = ctx.request.body;
    const accessToken = await service.admin.user.login(userName, password);

    if (!accessToken) {
      ctx.body = returnData(400, '账号或密码错误');
      return;
    }

    ctx.body = returnData(200, 'success', {
      accessToken
    });
  }
  
  /**
   * @description: 查询用户信息
   */
  public async getUserInfo() {
    const { ctx } = this;

    ctx.body = returnData(200, 'success', {
      avatar: 'https://picsum.photos/50/50?random=322EA7fE-5e8E-11D2-6ceb-8c1D2cFdD2Ed',
      permissions: ['admin'],
      userName: "admin"
    });
  }

  /**
   * @description: 上传文件
   */
  public async upload() {
    const { ctx, app } = this;
    const stream = await ctx.getFileStream();
    const result = await upload(stream, app);

    if (!result) {
      ctx.body = returnData(400, '请重新上传文件');
      return;
    }

    ctx.body = returnData(200, 'success', result as any);
  }
}