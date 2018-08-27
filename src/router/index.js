import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Host from '@/views/Host'
import Home from '@/views/Home'
import Normal from '@/views/Normal'
import Details from '@/views/Details'

Vue.use(Router)

Vue.use(Resource)

export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: '/Index',
      name: 'Index',
      component: Host,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/Normal/:name/:id',
          name: 'Normal',
          component: Normal,
          children: [
            {
              path: 'details',
              name: 'details',
              component: Details
            },
          ]
        }
      ]
    }
  ]
})
