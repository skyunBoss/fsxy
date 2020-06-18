/*
 * @Author: sky
 * @Date: 2019-08-27 21:45:14
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-06 12:29:15
 */
import { Service } from 'egg';
import { sign } from 'jsonwebtoken';
import * as crypto from 'crypto';

export default class AdminUserSerive extends Service {
    /**
     * @description: 登录
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    public async login(username: string, password: string): Promise<any> {
        const { ctx, app } = this;
        const { tokenExp, jwtSecret } = app.config;
        const user = await app.mysql.get('fs_admin', {
            username,
            password: crypto.createHash('md5').update(password).digest('hex'),
        });

        if (user && user.id) {
            const token = sign({
                user_id: user.id,
            }, jwtSecret, { expiresIn: tokenExp });
            ctx.set('token', token);

            return token;
        }

        return;
    }

    /**
     * @description: 注册
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    public async register(username: string, password: string): Promise<any> {
        const { app } = this;
        const result = await app.mysql.insert('fs_admin', {
            username,
            password: crypto.createHash('md5').update(password).digest('hex'),
        });

        return result;
    }
}