import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Register from '@/pages/Register.vue';
import Login from '@/pages/Login.vue';
import Wrapper from '@/pages/Wrapper.vue';
import Dashboard from "@/pages/Dashuboard.vue";
import Users from '@/pages/Users.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: Register},
  { path: '/login', component: Login},

  {
    path: '',
    component: Wrapper,
    children: [
      { path: '', component: Dashboard},
      { path: '/users', component: Users}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
