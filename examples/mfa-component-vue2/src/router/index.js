import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [{
    path: '/',
		redirect: '/mfa'
  }, {
    path: '/mfa',
    name: 'MFA',
    component: () => import('../views/MFA.vue')
  }]
})

export default router
