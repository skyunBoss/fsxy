/*
 * @Author: sky
 * @Date: 2019-11-28 10:31:32
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 18:00:21
 */
import { Controller } from 'egg';
import returnData from '../../utils/returnData';

export default class AdminCategoryController extends Controller {
    /**
     * @description: 查询分类列表
     */
    public async getCategoryList() {
        const { ctx } = this;
        const result = await ctx.service.admin.category.getCategoryList(ctx.query);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 查询分类详情
     */
    public async getCategoryDetail() {
        const { ctx } = this;
        const { id } = ctx.query;
        const result = await ctx.service.admin.category.getCategoryDetail(id);

        if (!result) ctx.throw(400);
        
        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 创建分类
     */
    public async createCategory() {
        const { ctx } = this;
        const result = await ctx.service.admin.category.createCategory(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '创建成功', {});
    }

    /**
     * @description: 编辑分类
     */
    public async updateCategory() {
        const { ctx } = this;
        const result = await ctx.service.admin.category.updateCategory(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '修改成功', {});
    }

    /**
     * @description: 删除分类
     */
    public async deleteCategory() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const result = await ctx.service.admin.category.deleteCategory(id);

        if (!result) {
            ctx.body = returnData(400, '此分类下有文章，不可删除');
            return;
        }

        ctx.body = returnData(200, '删除成功', {});
    }
}