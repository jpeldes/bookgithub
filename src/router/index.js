import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import SearchView from '@/views/SearchView.vue'
import BookmarkView from '@/views/BookmarkView.vue'
import RepoView from '@/views/RepoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: BookmarkView
  },
  {
    path: '/repo/:id',
    name: 'RepoView',
    component: RepoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
