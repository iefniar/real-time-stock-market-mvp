<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { HomeIcon } from '@heroicons/vue/24/solid'
import { StarIcon } from '@heroicons/vue/24/solid'
import { Cog8ToothIcon } from '@heroicons/vue/24/solid'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'vue-router'
import AlertMessage from '../../UI/AlertMessage.vue'
import SearchCommand from '@/components/UI/SearchCommand.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const showError = ref(false)
const errorMessage = ref('')
const dropdownOpen = ref(false)

const { isUserLoggedIn } = useAuth()

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (!target.closest('.user-dropdown')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleLogOut = async () => {
  closeDropdown()

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

const handleManageAccount = () => {
  closeDropdown()

  router.push({
    name: 'user'
  })
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
        <img
          src="@/assets/rtsm-logo.svg"
          alt="logo"
          class="w-5 h-5"
        />
        <div class="text-primary">
          <span class="text-secondary">RealTime</span>Market
        </div>
      </div>
      <div>
        <div v-if="isUserLoggedIn" class="relative user-dropdown">
          <img
            src="@/assets/soul-monkey-black-bg-avatar.png"
            alt="user avatar"
            class="cursor-pointer w-8 h-8 object-cover rounded-full"
            @click.stop="toggleDropdown"
          />
          <Transition
            enter-active-class="transition duration-150 ease-out"
            leave-active-class="transition duration-150 ease-in"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <ul
              v-if="dropdownOpen"
              class="absolute right-0 top-8 menu bg-secondary-content rounded-2xl z-50 w-52 p-2 shadow-sm border border-neutral inset-shadow-sm inset-shadow-neutral origin-top-right"
              @click.stop
            >
              <li class="py-2">
                <button
                  @click="handleManageAccount"
                  class="flex hover:bg-neutral active:text-accent text-primary hover:text-accent"
                >
                  <Cog8ToothIcon class="size-4" />
                  <div class="text-xs">Manage Account</div>
                </button>
              </li>

              <li class="border-t border-t-primary">
                <button
                  @click="handleLogOut"
                  class="flex hover:bg-neutral active:text-accent text-primary hover:text-accent"
                >
                  <ArrowRightStartOnRectangleIcon class="size-4" />
                  <div class="text-xs">Log Out</div>
                </button>
              </li>
            </ul>
          </Transition>
        </div>
        <div v-else class="text-primary">
          <router-link
            class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral border-primary-content border"
            :to="{ name: 'logIn' }"
          >
            <ArrowRightEndOnRectangleIcon class="size-4" />
            Log In
          </router-link>
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
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral border-primary-content border"
          :to="{ name: 'home' }"
        >
          <HomeIcon class="size-5" />
          <div class="text-sm">Dashboard</div>
        </router-link>
      </li>
      <li class="flex-1">
        <SearchCommand :label="'Search'" />
      </li>
      <li class="flex-1">
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral border-primary-content border"
          to="/watchlist"
        >
          <StarIcon class="size-5" />
          <div class="text-sm">Watchlist</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
