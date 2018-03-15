import Vue from 'vue'
import Router from 'vue-router'

import routes from './merge'
import indexView from 'page/index.vue'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: indexView
        },
        ...routes,
    ]
})