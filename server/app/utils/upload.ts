/*
 * @Author: xuchao
 * @Date: 2020-06-14 08:11:28
 * @LastEditTime: 2020-06-14 08:39:37
 * @LastEditors: xuchao
 */
import { Application } from 'egg';
import { extname } from 'path';
import * as qiniu from 'qiniu';

export default (stream: any, app: Application): Promise<any> => {
    const { accessKey, secretKey, bucket_name, bucket_domain } = app.config.qiniu;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket_name });
    const uploadToken = putPolicy.uploadToken(mac);
    const config = new qiniu.conf.Config({ zone: qiniu.zone.Zone_z0 });
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    
    return new Promise((resolved, reject) => {
      formUploader.putStream(uploadToken, `${Date.now()}${extname(stream.filename)}`, stream, putExtra, async (respErr, respBody, respInfo) => {
          if (respErr) reject(respErr);

          if (respInfo.statusCode === 200) {
              resolved(`${bucket_domain}${respBody.key}`);
          } else {
              reject(respErr);
          }
      });
    });
}