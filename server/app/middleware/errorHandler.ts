/*
 * @Description: 统一错误处理中间件
 * @Author: sky
 * @Date: 2019-11-26 20:32:00
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 08:38:29
 */
import { Context } from 'egg';

module.exports = () => {
    return async (ctx: Context, next: () => Promise<any>) => {
        try {
            await next();

            if (ctx.status !== 200) ctx.body = { error: ctx.body };
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', err, ctx);

            const status = err.status || 500;

            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && ctx.app.config.env === 'prod'
                ? 'Internal Server Error'
                : err.message;

            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = {
                code: status,
                data: null,
                msg: error
            };

            if (status === 422) {
                ctx.body.detail = err.errors;
            }

            ctx.status = status;
        }
    };
}