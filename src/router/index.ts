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
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: 'Login' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { title: 'Register' }
    },
    {
      path: '/forgot-password/:form',
      name: 'forgotPassword',
      component: () => import('../views/ForgotPasswordView.vue'),
      meta: { title: 'Forget Password' }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: { title: 'Shop' }
    },
    {
      path: '/item/:id',
      name: 'itemDetail',
      component: () => import('../views/ItemDetailView.vue'),
      meta: { title: 'Item Detail' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'Contact Us' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { title: 'Your Cart' }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
      meta: { title: 'Your Orders' }
    },
    {
      path: '/order-detail/:code',
      name: 'orderDetail',
      component: () => import('../views/OrderDetailView.vue'),
      meta: { title: 'Order Detail' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Not Found' }
    },
  ]
});

router.beforeEach((to, from, next) => {
  
  const auth = useAuthStore();

  document.title = `${to.meta.title} | The Vue Shop`;

  if(!auth.isAuthenticated && getTokenFromCookie()) auth.getLoginUser();

  if(to.name === 'login' || to.name === 'register' || to.name === 'forgotPassword'){
    if(getTokenFromCookie()) next({ name: 'home' });
    else next();
  }

  else if(to.name === 'cart' || to.name === 'order' || to.name === 'orderDetail'){
    if(getTokenFromCookie()) next();
    else {
      next({ name: 'login' });

      Toast.fire({
        icon: 'info',
        title: 'Please login first.'
      });
    }
  }

  else next();
  
})

export default router
