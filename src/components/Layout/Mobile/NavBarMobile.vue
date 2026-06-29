<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon } from '@heroicons/vue/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { StarIcon } from '@heroicons/vue/24/solid'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'vue-router'
import AlertMessage from '../../UI/AlertMessage.vue'
import { type User } from '@/types/global'

const router = useRouter()
const showError = ref(false)
const errorMessage = ref('')
const user = ref<User | null>(null)

const handleLogOut = async () => {
  const session = await authClient.getSession()

  if (!session?.data?.user) {
    errorMessage.value = 'No user currently logged in'
    showError.value = true
    return
  }

  try {
    const result = await authClient.signOut()

    if (result.error) {
      throw new Error(result.error.message)
    }

    router.push({
      name: 'logIn'
    })
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Log out failed'
    showError.value = true
  }
}
</script>

<template>
  <div class="relative">
    <AlertMessage
      v-if="showError"
      type="error"
      :message="errorMessage"
      @close="showError = false"
    />
  </div>
  <div
    class="fixed top-0 left-0 w-full bg-primary-content px-4 pt-8 border-b border-b-neutral z-20"
  >
    <div class="flex mb-2 justify-between items-center">
      <div class="flex gap-2">
        <img src="@/assets/avatar.png" alt="logo" class="w-5 h-5" />
        <div class="text-primary">
          <span class="text-secondary">RealTime</span>Market
        </div>
      </div>
      <div>
        <div class="dropdown dropdown-end">
          <img
            src="@/assets/avatar.png"
            alt="logo"
            tabindex="0"
            role="button"
            class="cursor-pointer w-8 h-8 object-cover rounded-full"
          />
          <ul
            tabindex="-1"
            class="dropdown-content menu bg-secondary-content rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a class="hover:bg-neutral active:text-accent text-primary"
                >Item 1</a
              >
            </li>
            <li>
              <button
                @click="handleLogOut"
                class="hover:bg-neutral active:text-accent text-primary"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 w-full bg-primary-content px-4 pb-8 z-20">
    <ul
      class="flex gap-2 w-full items-start justify-between pt-4 border-t border-t-neutral text-primary"
    >
      <li class="flex-1">
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content"
          :to="{ name: 'home' }"
        >
          <HomeIcon class="size-5" />
          <div class="text-sm">Dashboard</div>
        </router-link>
      </li>
      <li class="flex-1">
        <div
          class="flex items-center justify-between gap-1 py-4 px-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content"
        >
          <input
            type="text"
            placeholder="Search"
            class="w-full max-w-9/10 focus:outline-none"
          />
          <MagnifyingGlassIcon class="size-6" />
        </div>
      </li>
      <li class="flex-1">
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content"
          to="/watchlist"
        >
          <StarIcon class="size-5" />
          <div class="text-sm">Watchlist</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
