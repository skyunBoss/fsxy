/*
 * @Author: sky
 * @Date: 2019-12-08 10:32:51
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 08:58:45
 */
import { Service } from 'egg';

export default class AdminMemberService extends Service {
    /**
     * @description: 查询会员管理列表
     * @param {number} currentPage
     * @param {number} pageSize
     * @param {string} keyword
     */
    public async getMemberList({ currentPage, pageSize, keyword = '' }) {
        const { app } = this;
        const list = await app.mysql.query(`SELECT * FROM fs_member WHERE username LIKE '%${keyword}%' ORDER BY id DESC LIMIT ${(currentPage - 1) * pageSize}, ${pageSize}`);
        const total = list.length;

        return {
            total,
            list
        };
    }
}