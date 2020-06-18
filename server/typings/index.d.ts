/*
 * @Author: sky
 * @Date: 2019-11-26 10:11:41
 * @LastModifiedBy: sky
 * @LastEditTime : 2019-12-20 12:44:47
 */
import 'egg';

declare module 'egg' {
    interface Application {
        mysql: any;
    }
}