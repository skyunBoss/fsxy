import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "",
        name: "ArticleList",
        component: () => import("@/views/article/index"),
        meta: { title: "文章管理", icon: "book" },
      },
      {
        path: ":action(add|edit)",
        name: "ArticleEdit",
        component: () => import("@/views/article/edit"),
        meta: { title: "文章编辑" },
        hidden: true,
      },
    ],
  },
  {
    path: "/category",
    component: Layout,
    redirect: "noRedirect",
    hidden: true,
    children: [
      {
        path: ":action(add|edit)",
        name: "CategoryEdit",
        component: () => import("@/views/category/edit"),
        meta: { title: "分类编辑" },
        hidden: true,
      },
    ],
  },
  {
    path: "/member",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "",
        name: "MemberList",
        component: () => import("@/views/member/index"),
        meta: { title: "会员管理", icon: "user" },
      },
    ],
  },
  {
    path: "/examination",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "",
        name: "ExaminationList",
        component: () => import("@/views/examination/index"),
        meta: { title: "体检预约", icon: "ambulance" },
      },
    ],
  },
  {
    path: "/contact",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "",
        name: "ContactList",
        component: () => import("@/views/contact/index"),
        meta: { title: "联系我们", icon: "mail-bulk" },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: "hash",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;