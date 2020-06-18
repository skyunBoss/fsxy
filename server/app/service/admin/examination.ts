/*
 * @Author: sky
 * @Date: 2019-12-08 10:32:51
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 14:54:59
 */
import { Service } from 'egg';

export default class AdminExaminationService extends Service {
    /**
     * @description: 查询体检预约列表
     * @param {number} currentPage
     * @param {number} pageSize
     * @param {string} keyword
     */
    public async getExaminationList({ currentPage, pageSize, keyword = '' }) {
        const { app } = this;
        const list = await app.mysql.query(`SELECT fs_examination.id, fs_examination.user_id, username, unit, excel, status, date FROM fs_examination, fs_member WHERE fs_examination.user_id = fs_member.id AND username LIKE '%${keyword}%' ORDER BY id DESC LIMIT ${(currentPage - 1) * pageSize}, ${pageSize}`);
        const total = list.length;

        return {
            total,
            list
        };
    }

    /**
     * @description: 查询体检预约详情
     * @param {number} user_id
     */
    public async getExaminationDetail(user_id: number) {
        const { app } = this;
        const result = await app.mysql.get('fs_examination', {
            user_id
        });

        return result;
    }

    /**
     * @description: 创建体检预约
     * @param {number} user_id 用户id
     * @param {string} excel 文件
     */
    public async createExamination(user_id: number, excel: string) {
        const { app } = this;
        const result = await app.mysql.insert('fs_examination', {
            user_id,
            excel
        });

        return result;
    }

    /**
     * @description: 编辑体检预约
     * @param {number} id 预约id
     * @param {string} unit 预约单位
     * @param {string} date 预约时间
     */
    public async updateExamination({ id, unit, date }) {
        const { app } = this;
        const result = await app.mysql.update('fs_examination', {
            unit,
            date,
            status: 1,
        }, {
            where: {
                id
            }
        });

        return result;
    }
}