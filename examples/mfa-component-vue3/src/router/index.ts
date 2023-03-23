import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/mfa'
    },
    {
      path: '/mfa',
      name: 'MFA',
      component: () => import('../views/MFA.vue')
    },
  ]
})

export default router
