import HomePage from '@/components/Home/HomePage.vue';
import SignUpPage from '@/components/Auth/SignUpPage.vue';
import LogInPage from '@/components/Auth/LogInPage.vue';
import UserPage from '@/components/Auth/UserPage.vue';
import NotFoundPage from '@/components/NotFoundPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authClient } from "@/lib/auth-client";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: HomePage, name: "home", meta: {
    requiresAuth: true,
  }},
    {path: "/sign-up", component: SignUpPage, name: "signUp"},
    {path: "/log-in", component: LogInPage, name: "logIn"},
    {path: "/user", component: UserPage, name: "user", meta: {
    requiresAuth: true,
  }},
    {path: "/:catchAll(.*)", component: NotFoundPage, name: "notFound"},
  ],
  linkActiveClass: "text-accent bg-secondary-content border-neutral border inset-shadow-sm inset-shadow-neutral",
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) {
    return true;
  }

  try {
    const session = await authClient.getSession();

    if (!session?.data?.user) {
      return { name: "logIn" };
    }

    return true;
  } catch {
    return { name: "logIn" };
  }
});

export default router;
