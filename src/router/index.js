import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
/* import { getAuth } from 'firebase/auth'; */

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  /* {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
  }, */

  {
    path: '/meal-details/:id',
    name: 'MealDetails',
    component: () => import('@/views/MealDetails.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = getAuth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
}); */

export default router;
