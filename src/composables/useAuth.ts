import { computed } from 'vue'
import { authClient } from '@/lib/auth-client'

export function useAuth () {
  const session = authClient.useSession()

  const user = computed(() => session.value.data?.user ?? null)

  const isUserLoggedIn = computed(() => !!session.value.data?.user)

  return {
    session,
    user,
    isUserLoggedIn
  }
}
