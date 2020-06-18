/*
 * @Author: sky
 * @Date: 2019-08-27 21:45:14
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 15:50:45
 */
import { Service } from 'egg';
import * as crypto from 'crypto';

export default class AppUserSerive extends Service {
    /**
     * @description: 登录
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    public async login(username: string, password: string): Promise<any> {
        const { app } = this;
        const user = await app.mysql.get('fs_member', {
            username,
            password: crypto.createHash('md5').update(password).digest('hex'),
        });

        return user;
    }

    /**
     * @description: 注册
     * @param {string} username 用户名
     * @param {string} name 姓名
     * @param {string} password 密码
     * @param {string} sex 性别
     * @param {string} job 工种
     * @param {string} seniority 工龄
     * @param {string} department 科室
     * @param {string} company 公司
     * @param {string} birthday 出生年月
     */
    public async register(params: { password: string }): Promise<any> {
        const { app } = this;
        const { password } = params;
        const { headImages } = app.config.app;
        const result = await app.mysql.insert('fs_member', {
            ...params,
            password: crypto.createHash('md5').update(password).digest('hex'),
            head: headImages[Math.ceil(Math.random() * 10)]
        });

        return result;
    }

    /**
     * @description: 查询用户信息
     * @param {number} id 用户id
     */
    public async getUserInfo(id: number): Promise<any> {
        const { app } = this;
        const user = await app.mysql.get('fs_member', {
            id
        });

        return user;
    }
}