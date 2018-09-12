import Main from '../views/main/Main'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {hideInMenu: true, notCache: true, title: '首页'},
        component: () => import('../views/home/Home.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {hide: true},
    component: Main,
    children: [
      {
        path: 'page',
        name: 'page',
        meta: {title: '设置', icon: 'md-settings'},
        component: () => import('../views/setting/Setting.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('../views/error/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('../views/error/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('../views/error/404.vue')
  }
]
