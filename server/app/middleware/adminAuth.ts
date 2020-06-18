/*
 * @Description: token验证中间件
 * @Author: sky
 * @Date: 2019-08-26 22:19:08
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 17:15:04
 */
import { Context } from 'egg';
import { sign, verify } from 'jsonwebtoken';

export default (): any => {
    return async (ctx: Context, next: () => Promise<any>) => {
        const { accesstoken } = ctx.header;
        const { jwtSecret, tokenExp } = ctx.app.config;

        if (!accesstoken) {
            ctx.throw(401, 'token不能为空');
        }

        // 验证token是否过期
        try {
            const { user_id, exp } = verify(accesstoken, jwtSecret) as any;
            // 过期时间
            const expiresIn = exp;
            const now = Math.floor(new Date().getTime() / 1000);
            // 有效期小于一小时的重新赋值token
            const isOver = expiresIn - now < 60 * 60;

            if (isOver) {
                const token = sign({
                    user_id,
                }, jwtSecret, { expiresIn: tokenExp });
                ctx.set('accesstoken', token);
            }
        } catch (err) {
            // token过期
            if (err.name === 'TokenExpiredError') {
                ctx.throw(401, 'token过期');
            } else if (err.name === 'JsonWebTokenError') {
                ctx.throw(401, 'token无效');
            }
            return;
        }

        await next();
    };
}