/*
 * @Author: sky
 * @Date: 2019-12-08 10:32:51
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 08:58:23
 */
import { Service } from 'egg';

export default class AdminCategoryService extends Service {
    /**
     * @description: 查询分类列表
     * @param {number} currentPage
     * @param {number} pageSize
     * @param {string} keyword
     */
    public async getCategoryList({ currentPage, pageSize, keyword = '' }) {
        const { app } = this;
        const list = await app.mysql.query(`SELECT * FROM fs_category WHERE title LIKE '%${keyword}%' ORDER BY id DESC LIMIT ${(currentPage - 1) * pageSize}, ${pageSize}`);
        const total = list.length;

        return {
            total,
            list
        };
    }

    /**
     * @description: 查询分类详情
     * @param {number} id
     */
    public async getCategoryDetail(id: number) {
        const { app } = this;
        const result = await app.mysql.get('fs_category', {
            id
        });

        return result;
    }

    /**
     * @description: 创建分类
     * @param {string} title 分类标题
     * @param {string} desc 分类描述
     * @param {string} cover 分类封面
     */
    public async createCategory({title, desc, cover}) {
        const { app } = this;
        const result = await app.mysql.insert('fs_category', {
            title,
            desc,
            cover
        });

        return result;
    }

    /**
     * @description: 编辑分类
     * @param {number} id 分类id
     * @param {string} title 分类标题
     * @param {string} desc 分类描述
     * @param {string} cover 分类封面
     */
    public async updateCategory({id, title, desc, cover}) {
        const { app } = this;
        const result = await app.mysql.update('fs_category', {
            title,
            desc,
            cover
        }, {
            where: {
                id
            }
        });

        return result;
    }

    /**
     * @description: 删除分类
     * @param {number} id
     */
    public async deleteCategory(id: number) {
        const { app } = this;
        const count = await app.mysql.count('fs_article', {
            category_id: id
        });

        if (count === 0) {
            const result = await app.mysql.delete('fs_category', {
                id
            });
    
            return result;
        }

        return;
    }
}