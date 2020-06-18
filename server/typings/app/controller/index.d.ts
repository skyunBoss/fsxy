// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminArticle from '../../../app/controller/admin/article';
import ExportAdminCategory from '../../../app/controller/admin/category';
import ExportAdminContact from '../../../app/controller/admin/contact';
import ExportAdminExamination from '../../../app/controller/admin/examination';
import ExportAdminMember from '../../../app/controller/admin/member';
import ExportAdminUser from '../../../app/controller/admin/user';
import ExportAppComment from '../../../app/controller/app/comment';
import ExportAppUser from '../../../app/controller/app/user';

declare module 'egg' {
  interface IController {
    admin: {
      article: ExportAdminArticle;
      category: ExportAdminCategory;
      contact: ExportAdminContact;
      examination: ExportAdminExamination;
      member: ExportAdminMember;
      user: ExportAdminUser;
    }
    app: {
      comment: ExportAppComment;
      user: ExportAppUser;
    }
  }
}
