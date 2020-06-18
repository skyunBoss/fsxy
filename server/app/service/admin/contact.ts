/*
 * @Author: sky
 * @Date: 2019-12-08 10:32:51
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 08:58:35
 */
import { Service } from 'egg';

export default class AdminContactService extends Service {
    /**
     * @description: 查询联系我们列表
     * @param {number} currentPage
     * @param {number} pageSize
     * @param {string} keyword
     */
    public async getContactList({ currentPage, pageSize, keyword = '' }) {
        const { app } = this;
        const list = await app.mysql.query(`SELECT * FROM fs_contact WHERE label LIKE '%${keyword}%' ORDER BY id DESC LIMIT ${(currentPage - 1) * pageSize}, ${pageSize}`);
        const total = list.length;

        return {
            total,
            list
        };
    }

    /**
     * @description: 创建联系我们
     * @param {number} label 标签
     * @param {string} value 值
     */
    public async createContact({label, value}) {
        const { app } = this;
        const result = await app.mysql.insert('fs_contact', {
            label,
            value
        });

        return result;
    }

    /**
     * @description: 编辑联系我们
     * @param {number} id
     * @param {number} label 标签
     * @param {string} value 值
     */
    public async updateContact({id, label, value}) {
        const { app } = this;
        const result = await app.mysql.update('fs_contact', {
            label,
            value
        }, {
            where: {
                id
            }
        });

        return result;
    }

    /**
     * @description: 删除联系我们
     * @param {number} id
     */
    public async deleteContact(id: number) {
        const { app } = this;
        const result = await app.mysql.delete('fs_contact', {
            id
        });

        return result;
    }
}