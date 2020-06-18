/*
 * @Author: sky
 * @Date: 2019-11-28 10:31:32
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 18:00:46
 */
import { Controller } from 'egg';
import returnData from '../../utils/returnData';

export default class AdminMemberController extends Controller {
    /**
     * @description: 查询会员管理列表
     */
    public async getMemberList() {
        const { ctx } = this;
        const result = await ctx.service.admin.member.getMemberList(ctx.query);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, 'success', result);
    }
}