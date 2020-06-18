// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdminArticle from '../../../app/service/admin/article';
import ExportAdminCategory from '../../../app/service/admin/category';
import ExportAdminContact from '../../../app/service/admin/contact';
import ExportAdminExamination from '../../../app/service/admin/examination';
import ExportAdminMember from '../../../app/service/admin/member';
import ExportAdminUser from '../../../app/service/admin/user';
import ExportAppComment from '../../../app/service/app/comment';
import ExportAppUser from '../../../app/service/app/user';

declare module 'egg' {
  interface IService {
    admin: {
      article: AutoInstanceType<typeof ExportAdminArticle>;
      category: AutoInstanceType<typeof ExportAdminCategory>;
      contact: AutoInstanceType<typeof ExportAdminContact>;
      examination: AutoInstanceType<typeof ExportAdminExamination>;
      member: AutoInstanceType<typeof ExportAdminMember>;
      user: AutoInstanceType<typeof ExportAdminUser>;
    }
    app: {
      comment: AutoInstanceType<typeof ExportAppComment>;
      user: AutoInstanceType<typeof ExportAppUser>;
    }
  }
}
