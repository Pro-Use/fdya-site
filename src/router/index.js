import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from '../views/WorkView.vue'
import InfoView from '../views/InfoView.vue'
import AccessView from '../views/AccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/no-splash',
      name: 'home',
      component: HomeView
    },
    {
      path: '/info/',
      name: 'info',
      component: InfoView,
    },
    {
      path: '/accessibility/',
      name: 'accessibility',
      component: AccessView,
    },
    {
      path: '/works/:work/:language',
      name: 'work',
      component: WorkView,
      props: true,
    }
  ]
})

export default router
