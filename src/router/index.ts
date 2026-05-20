import HomePage from '@/components/Home/HomePage.vue';
import SignUpPage from '@/components/Auth/SignUpPage.vue';
import LogInPage from '@/components/Auth/LogInPage.vue';
import NotFoundPage from '@/components/NotFoundPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: HomePage, name: "home"},
    {path: "/sign-up", component: SignUpPage, name: "signUp"},
    {path: "/log-in", component: LogInPage, name: "logIn"},
    {path: "/:catchAll(.*)", component: NotFoundPage, name: "notFound"},
  ],
  linkActiveClass: "text-accent bg-neutral",
});

export default router;
