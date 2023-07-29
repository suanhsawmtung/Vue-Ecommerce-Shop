import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { Toast } from '@/services/alert';
import { getTokenFromCookie } from '@/services/cookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/detail/:code',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  
  const auth = useAuthStore();

  if(!auth.isAuthenticated && getTokenFromCookie()) auth.getLoginUser();

  if(to.name === 'login' && getTokenFromCookie()) next({ name: 'home' });

  else if(to.name === 'register' && getTokenFromCookie()) next({ name: 'home' });

  else if(to.name === 'cart' && !getTokenFromCookie()){ 

    next({ name: 'login' });

    Toast.fire({
      icon: 'info',
      title: 'Please login first.'
    });

  }else if( to.name === 'order' && !getTokenFromCookie()){ 

    next({ name: 'login' });

    Toast.fire({
      icon: 'info',
      title: 'Please login first.'
    });

  }else next();
  
})

export default router
