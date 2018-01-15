import Vue from 'vue'
import Router from 'vue-router'

import indexView from 'page/index.vue'
import Rjapan from './japanese/japanese'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexView
    },
    ...Rjapan,

  ]
})
