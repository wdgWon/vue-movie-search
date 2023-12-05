import { createRouter, createWebHistory } from 'vue-router'
import SearchViewVue from '@/views/SearchView.vue'
import DetailViewVue from '@/views/DetailView.vue'
import LandingPageVue from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageVue
    },
    {
      path: '/search',
      name: 'search',
      component: SearchViewVue
    },
    {
      path: '/detail/:movieId',
      name: 'detail',
      component: DetailViewVue
    },
  ]
})

export default router
