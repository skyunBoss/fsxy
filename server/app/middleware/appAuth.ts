/*
 * @Description: uuid验证中间件
 * @Author: sky
 * @Date: 2019-08-26 22:19:08
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-12 17:14:54
 */
import { Context } from 'egg';

export default (): any => {
    return async (ctx: Context, next: () => Promise<any>) => {
        const { uuid } = ctx.header;

        if (!uuid) {
            ctx.throw(401, 'uuid不能为空');
        }

        await next();
    };
}