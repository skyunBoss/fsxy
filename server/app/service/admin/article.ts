/*
 * @Author: sky
 * @Date: 2019-12-08 10:32:51
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 08:58:12
 */
import { Service } from 'egg';

export default class AdminArticleService extends Service {
    /**
     * @description: 查询文章列表
     * @param {number} category_id 分类id
     * @param {number} currentPage
     * @param {number} pageSize
     * @param {string} keyword
     */
    public async getArticleList({ category_id, currentPage, pageSize, keyword = '' }) {
        const { app } = this;
        const list = await app.mysql.query(`SELECT * FROM fs_article WHERE ${category_id ? `category_id = ${category_id} AND` : ''} title LIKE '%${keyword}%' ORDER BY id DESC LIMIT ${(currentPage - 1) * pageSize}, ${pageSize}`);
        const total = list.length;

        return {
            total,
            list
        };
    }

    /**
     * @description: 查询文章详情
     * @param {number} id
     */
    public async getArticleDetail(id: number) {
        const { app } = this;
        const result = await app.mysql.get('fs_article', {
            id
        });

        return result;
    }

    /**
     * @description: 创建文章
     * @param {number} category_id 分类id
     * @param {string} title 文章标题
     * @param {string} content 文章内容
     */
    public async createArticle({category_id, title, content}) {
        const { app } = this;
        const result = await app.mysql.insert('fs_article', {
            category_id,
            title,
            content
        });

        return result;
    }

    /**
     * @description: 编辑文章
     * @param {number} id 文章id
     * @param {number} category_id 分类id
     * @param {string} title 文章标题
     * @param {string} content 文章内容
     */
    public async updateArticle({id, category_id, title, content}) {
        const { app } = this;
        const result = await app.mysql.update('fs_article', {
            category_id,
            title,
            content
        }, {
            where: {
                id
            }
        });

        return result;
    }

    /**
     * @description: 删除文章
     * @param {number} id
     */
    public async deleteArticle(id: number) {
        const { app } = this;
        const result = await app.mysql.delete('fs_article', {
            id
        });

        return result;
    }
}