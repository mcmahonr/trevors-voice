import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/LogIn.vue'),
      },
      {
        path: '/board/:id',
        name: 'board',
        component: () => import('pages/PecBoard.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/SettingsPage.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
