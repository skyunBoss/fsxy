/*
 * @Author: sky
 * @Date: 2019-12-09 21:22:10
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-06 11:38:00
 */
export default function returnData(code: number = 200, msg: string = 'success', data: object = {}): object {
    return {
        code,
        data,
        msg
    };
}