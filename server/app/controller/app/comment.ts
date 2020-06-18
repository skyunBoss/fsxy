/*
 * @Author: sky
 * @Date: 2019-11-28 10:31:32
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 14:57:52
 */
import { Controller } from 'egg';
import upload from '../../utils/upload';
import returnData from '../../utils/returnData';

export default class AdminCommentController extends Controller {
    /**
     * @description: 查询交流学习列表
     */
    public async getCommentList() {
        const { ctx } = this;
        const result = await ctx.service.app.comment.getCommentList(ctx.query);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 创建交流学习
     */
    public async createComment() {
        const { ctx, app } = this;
        const stream = await ctx.getFileStream();
        const { user_id, content } = stream.fields;
        const image = await upload(stream, app);

        if (!image) ctx.throw(400);

        const result = await ctx.service.app.comment.createComment(user_id, content, image);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '创建成功', {});
    }
}