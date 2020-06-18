/*
 * @Author: sky
 * @Date: 2019-11-28 10:31:32
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 18:00:39
 */
import { Controller } from 'egg';
import returnData from '../../utils/returnData';

export default class AdminContactController extends Controller {
    /**
     * @description: 查询联系我们列表
     */
    public async getContactList() {
        const { ctx } = this;
        const result = await ctx.service.admin.contact.getContactList(ctx.query);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 创建联系我们
     */
    public async createContact() {
        const { ctx } = this;
        const result = await ctx.service.admin.contact.createContact(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '创建成功', {});
    }

    /**
     * @description: 编辑联系我们
     */
    public async updateContact() {
        const { ctx } = this;
        const result = await ctx.service.admin.contact.updateContact(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '修改成功', {});
    }

    /**
     * @description: 删除联系我们
     */
    public async deleteContact() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const result = await ctx.service.admin.contact.deleteContact(id);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '删除成功', {});
    }
}