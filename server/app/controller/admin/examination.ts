/*
 * @Author: sky
 * @Date: 2019-11-28 10:31:32
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 10:18:35
 */
import { Controller } from 'egg';
import upload from '../../utils/upload';
import returnData from '../../utils/returnData';

export default class AdminExaminationController extends Controller {
    /**
     * @description: 查询体检预约列表
     */
    public async getExaminationList() {
        const { ctx } = this;
        const result = await ctx.service.admin.examination.getExaminationList(ctx.query);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 查询体检预约详情
     */
    public async getExaminationDetail() {
        const { ctx } = this;
        const { user_id } = ctx.query;
        const result = await ctx.service.admin.examination.getExaminationDetail(user_id);

        if (!result) ctx.throw(400);
        
        ctx.body = returnData(200, 'success', result);
    }

    /**
     * @description: 创建体检预约
     */
    public async createExamination() {
        const { ctx, app } = this;
        const stream = await ctx.getFileStream();
        const { user_id } = stream.fields;
        const excel = await upload(stream, app);

        if (!excel) ctx.throw(400);

        const result = await ctx.service.admin.examination.createExamination(user_id, excel);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '创建成功', {});
    }

    /**
     * @description: 编辑体检预约
     */
    public async updateExamination() {
        const { ctx } = this;
        const result = await ctx.service.admin.examination.updateExamination(ctx.request.body);

        if (!result) ctx.throw(400);

        ctx.body = returnData(200, '修改成功', {});
    }
}