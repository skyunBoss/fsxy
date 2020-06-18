/*
 * @Author: sky
 * @Date: 2019-12-08 10:32:51
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 15:48:14
 */
import { Service } from 'egg';

export default class AdminCommentService extends Service {
    /**
     * @description: 查询交流学习列表
     * @param {number} currentPage
     * @param {number} pageSize
     */
    public async getCommentList({ currentPage, pageSize }) {
        const { app } = this;
        const list = await app.mysql.query(`SELECT fs_comment.id, fs_comment.user_id, username, head, content, image, fs_comment.updated_at FROM fs_comment, fs_member WHERE fs_comment.user_id = fs_member.id ORDER BY id DESC LIMIT ${(currentPage - 1) * pageSize}, ${pageSize}`);
        const total = list.length;

        return {
            total,
            list
        };
    }

    /**
     * @description: 创建交流学习
     * @param {number} user_id 用户id
     * @param {string} content 内容
     * @param {string} image 图片
     */
    public async createComment(user_id: number, content: string, image: string) {
        const { app } = this;
        const result = await app.mysql.insert('fs_comment', {
            user_id,
            content,
            image
        });

        return result;
    }
}