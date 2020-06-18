// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAuth from '../../../app/middleware/adminAuth';
import ExportAppAuth from '../../../app/middleware/appAuth';
import ExportErrorHandler from '../../../app/middleware/errorHandler';

declare module 'egg' {
  interface IMiddleware {
    adminAuth: typeof ExportAdminAuth;
    appAuth: typeof ExportAppAuth;
    errorHandler: typeof ExportErrorHandler;
  }
}
