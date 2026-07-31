import HomePage from '@/components/Home/HomePage.vue'
import SignUpPage from '@/components/Auth/SignUpPage.vue'
import LogInPage from '@/components/Auth/LogInPage.vue'
import UserPage from '@/components/Auth/UserPage.vue'
import StockDetails from '@/components/Stocks/StockDetails.vue'
import Watchlist from '@/components/Stocks/Watchlist.vue'
import CheckEmailPage from '@/components/Auth/CheckEmailPage.vue'
import EmailVerifiedPage from '@/components/Auth/EmailVerifiedPage.vue'
import ForgotPasswordPage from '@/components/Auth/ForgotPasswordPage.vue'
import ResetPasswordPage from '@/components/Auth/ResetPasswordPage.vue'
import DeleteAccountPage from '@/components/Auth/DeleteAccountPage.vue'
import NotFoundPage from '@/components/NotFoundPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authClient } from '@/lib/auth-client'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
      name: 'home',
      meta: {
        requiresAuth: true
      }
    },
    { path: '/sign-up', component: SignUpPage, name: 'signUp' },
    { path: '/log-in', component: LogInPage, name: 'logIn' },
    { path: '/check-email', component: CheckEmailPage, name: 'checkEmail' },
    {
      path: '/email-verified',
      component: EmailVerifiedPage,
      name: 'emailVerified'
    },
    {
      path: '/forgot-password',
      component: ForgotPasswordPage,
      name: 'forgotPassword'
    },
    {
      path: '/reset-password',
      component: ResetPasswordPage,
      name: 'resetPassword'
    },
    {
      path: '/delete-account',
      component: DeleteAccountPage,
      name: 'deleteAccount'
    },
    {
      path: '/user',
      component: UserPage,
      name: 'user',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watchlist',
      component: Watchlist,
      name: 'watchlist',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stocks/:symbol',
      component: StockDetails,
      name: 'stockDetails',
      props: route => ({
        symbol: String(route.params.symbol)
      })
    },
    { path: '/:catchAll(.*)', component: NotFoundPage, name: 'notFound' }
  ],
  linkActiveClass:
    'text-accent bg-secondary-content border-neutral border inset-shadow-sm inset-shadow-neutral'
})

router.beforeEach(async to => {
  if (!to.meta.requiresAuth) {
    return true
  }

  try {
    const session = await authClient.getSession()

    if (!session?.data?.user) {
      return { name: 'logIn' }
    }

    return true
  } catch {
    return { name: 'logIn' }
  }
})

export default router
