import HomePage from '@/components/Home/HomePage.vue';
import SignUpPage from '@/components/Auth/SignUpPage.vue';
import LogInPage from '@/components/Auth/LogInPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: HomePage},
    {path: "/sign-up", component: SignUpPage},
    {path: "/log-in", component: LogInPage},
  ],
});

export default router;
