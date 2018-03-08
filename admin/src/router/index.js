import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
const Layout = _import('layout/layout')

Vue.use(Router)
export const constantRouterMap = [
  { path: '/login', component: _import('login/index') },
  { path: '/404', component: _import('404') },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
