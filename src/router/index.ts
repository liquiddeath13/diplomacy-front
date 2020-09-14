import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/task-construct',
    name: 'task-construct',
    component: () => import('../views/TaskConstructor.vue')
  },
  {
    path: '/test-construct',
    name: 'test-construct',
    component: () => import('../views/TestConstructor.vue')
  },
  {
    path: '/test-solve-view',
    name: 'test-solve-view',
    component: () => import('../views/TestSolveView.vue')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
