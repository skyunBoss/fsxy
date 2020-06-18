/*
 * @Author: sky
 * @Date: 2019-11-28 10:31:32
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 18:00:14
 */
import { Controller } from 'egg';
import returnData from '../../utils/returnData';

export default class AdminArticleController extends Controller {
    /**
     * @description: 查询文章列表
     */
    public async getArticleList() {
        const { ctx } = this;
        const result = await ctx.service.admin.article.getArticleList(ctx.query);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 查询文章详情
     */
    public async getArticleDetail() {
        const { ctx } = this;
        const { id } = ctx.query;
        const result = await ctx.service.admin.article.getArticleDetail(id);

        if (!result) ctx.throw(400);
        
        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 创建文章
     */
    public async createArticle() {
        const { ctx } = this;
        const result = await ctx.service.admin.article.createArticle(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '创建成功', {});
    }

    /**
     * @description: 编辑文章
     */
    public async updateArticle() {
        const { ctx } = this;
        const result = await ctx.service.admin.article.updateArticle(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '修改成功', {});
    }

    /**
     * @description: 删除文章
     */
    public async deleteArticle() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const result = await ctx.service.admin.article.deleteArticle(id);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '删除成功', {});
    }
}