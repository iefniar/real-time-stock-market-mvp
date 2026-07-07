<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid'
import { HomeIcon } from '@heroicons/vue/24/solid'
import { StarIcon } from '@heroicons/vue/24/solid'
import { ChevronUpIcon } from '@heroicons/vue/24/solid'
import { Cog8ToothIcon } from '@heroicons/vue/24/solid'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid'
import SearchCommand from '@/components/UI/SearchCommand.vue'
import { useRouter } from 'vue-router'
import { authClient } from '@/lib/auth-client'
import { getInitials } from '@/utils/functions'
import AlertMessage from '../../UI/AlertMessage.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const showError = ref(false)
const errorMessage = ref('')
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function handleTriggerClick(event: MouseEvent) {
  event.stopPropagation()

  dropdownOpen.value = !dropdownOpen.value
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const { user, isUserLoggedIn } = useAuth()

const userInitials = computed(() =>
  user.value ? getInitials(user.value.name) : ''
)

const handleLogOut = async () => {
  dropdownOpen.value = false
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
  dropdownOpen.value = false

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
  <div class="px-2 py-6 z-20">
    <div class="flex gap-2 mb-3 px-2 pb-3">
      <img src="@/assets/avatar.png" alt="logo" class="w-5 h-5" />
      <div class="text-primary">
        <span class="text-secondary">RealTime</span>Market
      </div>
    </div>
    <ul class="flex flex-col gap-y-3 text-primary">
      <li v-if="!isUserLoggedIn">
        <router-link
          class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral border-primary-content border"
          :to="{ name: 'logIn' }"
        >
          <ArrowRightEndOnRectangleIcon class="size-5" />
          Log In
        </router-link>
      </li>
      <li>
        <SearchCommand />
      </li>
      <li>
        <router-link
          class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral border-primary-content border"
          :to="{ name: 'home' }"
        >
          <HomeIcon class="size-5" />
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link
          class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral border-primary-content border"
          to="/watchlist"
        >
          <StarIcon class="size-5" />
          Watchlist
        </router-link>
      </li>
    </ul>
    <div v-if="isUserLoggedIn" ref="dropdownRef" class="fixed bottom-4 w-44">
      <!-- Trigger -->
      <div @click="handleTriggerClick" class="cursor-pointer">
        <div
          class="flex items-center justify-between text-primary py-1 px-2 rounded-xl transition hover:bg-neutral"
          :class="{ 'bg-neutral': dropdownOpen }"
        >
          <img
            src="@/assets/soul-monkey-black-bg-avatar.png"
            alt="user avatar"
            class="w-6 h-6 object-cover rounded-full"
          />
          <div>{{ userInitials }}</div>
          <ChevronUpIcon
            class="size-4 transition-transform"
            :class="{ 'rotate-180': dropdownOpen }"
          />
        </div>
      </div>
      <!-- Menu -->
      <Transition
        enter-active-class="transition duration-150"
        leave-active-class="transition duration-150"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <ul
          v-if="dropdownOpen"
          class="absolute bottom-full mb-2 menu bg-secondary-content rounded-2xl z-50 w-52 p-2 shadow-sm border border-neutral"
        >
          <li class="py-2">
            <button
              @click="handleManageAccount"
              class="flex hover:bg-neutral text-primary hover:text-accent"
            >
              <Cog8ToothIcon class="size-4" />
              <div class="text-xs">Manage Account</div>
            </button>
          </li>
          <li class="border-t border-t-primary">
            <button
              @click="handleLogOut"
              class="flex hover:bg-neutral text-primary hover:text-accent"
            >
              <ArrowRightStartOnRectangleIcon class="size-4" />
              <div class="text-xs">Log Out</div>
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>
