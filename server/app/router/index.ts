/*
 * @Author: sky
 * @Date: 2019-11-28 10:27:05
 * @LastModifiedBy: sky
 * @LastEditTime: 2020-06-14 14:58:59
 */
import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router, middleware } = app;
    const apiRouter = router.namespace('/api');
    const adminAuth = middleware.adminAuth();
    const appAuth = middleware.appAuth();

    apiRouter.post('/admin/login', controller.admin.user.login);
    apiRouter.post('/app/login', controller.app.user.login);
    apiRouter.post('/app/register', controller.app.user.register);
    apiRouter.post('/admin/user/info', adminAuth, controller.admin.user.getUserInfo);
    apiRouter.post('/app/user/info', appAuth, controller.app.user.getUserInfo);
    apiRouter.post('/upload', adminAuth, controller.admin.user.upload);
    // apiRouter.post('/app/upload', appAuth, controller.admin.user.upload);
    apiRouter.get('/category/list', controller.admin.category.getCategoryList);
    apiRouter.get('/category/detail', controller.admin.category.getCategoryDetail);
    apiRouter.post('/category', adminAuth, controller.admin.category.createCategory);
    apiRouter.put('/category', adminAuth, controller.admin.category.updateCategory);
    apiRouter.delete('/category', adminAuth, controller.admin.category.deleteCategory);
    apiRouter.get('/article/list', controller.admin.article.getArticleList);
    apiRouter.get('/article/detail', controller.admin.article.getArticleDetail);
    apiRouter.post('/article', adminAuth, controller.admin.article.createArticle);
    apiRouter.put('/article', adminAuth, controller.admin.article.updateArticle);
    apiRouter.delete('/article', adminAuth, controller.admin.article.deleteArticle);
    apiRouter.get('/contact', controller.admin.contact.getContactList);
    apiRouter.post('/contact', adminAuth, controller.admin.contact.createContact);
    apiRouter.put('/contact', adminAuth, controller.admin.contact.updateContact);
    apiRouter.delete('/contact', adminAuth, controller.admin.contact.deleteContact);
    apiRouter.get('/member', adminAuth, controller.admin.member.getMemberList);
    apiRouter.get('/examination/list', adminAuth, controller.admin.examination.getExaminationList);
    apiRouter.get('/examination/detail', controller.admin.examination.getExaminationDetail);
    apiRouter.post('/examination', appAuth, controller.admin.examination.createExamination);
    apiRouter.put('/examination', adminAuth, controller.admin.examination.updateExamination);
    apiRouter.get('/comment', controller.app.comment.getCommentList);
    apiRouter.post('/comment', appAuth, controller.app.comment.createComment);
}