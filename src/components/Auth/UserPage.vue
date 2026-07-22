<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authClient } from '@/lib/auth-client'
import { type User } from '@/types/global'
import {
  GlobeAmericasIcon,
  DocumentCurrencyPoundIcon,
  ShieldExclamationIcon,
  SwatchIcon,
  ArchiveBoxXMarkIcon,
  NoSymbolIcon
} from '@heroicons/vue/24/solid'
import InfoCard from '../UI/InfoCard.vue'
import AlertMessage from '../UI/AlertMessage.vue'

const router = useRouter()
const user = ref<User | null>(null)
const open = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const password = ref('')

function closeDialog() {
  open.value = false
  password.value = ''
}

async function deleteAccountHandler() {
  showError.value = false
  errorMessage.value = ''

  if (!password.value.trim()) {
    errorMessage.value = 'Please enter your password.'
    showError.value = true
    return
  }

  try {
    const result = await authClient.deleteUser({
      password: password.value
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    // Clear the password from memory
    password.value = ''

    closeDialog()

    router.push({
      name: 'logIn'
    })
  } catch (error) {
    password.value = ''

    errorMessage.value =
      error instanceof Error ? error.message : 'Account deletion failed.'

    showError.value = true
  }
}

onMounted(async () => {
  const session = await authClient.getSession()

  if (!session?.data?.user) {
    router.push({ name: 'logIn' })
    return
  }

  user.value = {
    id: session.data.user.id,
    name: session.data.user.name,
    email: session.data.user.email,
    country: session.data.user.country,
    investmentGoals: session.data.user.investmentGoals,
    riskTolerance: session.data.user.riskTolerance,
    preferredIndustry: session.data.user.preferredIndustry
  }
})
</script>

<template>
  <div>
    <div class="relative">
      <AlertMessage
        v-if="showError"
        type="error"
        :message="errorMessage"
        @close="showError = false"
      />
    </div>
    <div v-if="user">
      <div class="flex flex-col items-center min-h-dvh">
        <div class="flex flex-col py-4 gap-2">
          <div class="flex items-center gap-4 mb-2">
            <img
              src="@/assets/soul-monkey-black-bg-avatar.png"
              alt="user avatar"
              class="w-24 h-24 object-cover rounded-full"
            />
            <div class="flex flex-col gap-1">
              <p class="text-info-content text-2xl">
                {{ user.name }}
              </p>
              <p class="text-secondary text-xs">{{ user.email }}</p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row md:items-center gap-2">
            <InfoCard
              :icon="GlobeAmericasIcon"
              label="Country"
              :value="user.country"
            />
            <InfoCard
              :icon="DocumentCurrencyPoundIcon"
              label="Investment Goals"
              :value="user.investmentGoals"
            />
          </div>
          <div class="flex flex-col md:flex-row md:items-center gap-2">
            <InfoCard
              :icon="ShieldExclamationIcon"
              label="Risk Tolerance"
              :value="user.riskTolerance"
            />
            <InfoCard
              :icon="SwatchIcon"
              label="Preferred Industry"
              :value="user.preferredIndustry"
            />
          </div>
          <div
            tabindex="0"
            class="collapse collapse-arrow bg-neutral/50 rounded-2xl border-neutral-content border"
          >
            <div class="collapse-title text-secondary/75 text-sm">
              Manage account deletion
            </div>
            <div class="collapse-content text-sm">
              <button
                class="btn bg-error rounded-md shadow-none border-none drop-shadow-sm/75 drop-shadow-error transition duration-300 ease-in-out z-10 hover:brightness-125"
                @click="open = true"
              >
                <ArchiveBoxXMarkIcon class="size-3" />
                <span class="text-error-content font-normal"
                  >Delete Account</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <dialog class="modal z-10" :class="{ 'modal-open': open }">
        <div
          class="modal-box rounded-xl bg-secondary-content relative max-h-[80dvh] p-0 border-neutral border inset-shadow-sm inset-shadow-neutral"
        >
          <div class="sticky top-0 z-10 bg-secondary-content py-6 pl-4 pr-2">
            <div class="flex flex-col w-full items-center">
              <div class="flex flex-col items-start gap-1">
                <div class="text-lg font-light text-secondary">
                  Are you sure you want to delete your account?
                </div>
                <div class="text-xs font-bold text-error/90">
                  This action is permanent and cannot be undone.
                </div>
                <div class="mt-8 text-md font-light text-secondary">
                  Deleting your account will:
                </div>
                <ul class="flex flex-col gap-2 text-secondary/80">
                  <li
                    class="p-2 rounded-lg flex gap-2 items-center text-xs font-light text-error/70 bg-primary-content"
                  >
                    <NoSymbolIcon class="size-3" />
                    <div>
                      <span class="font-bold">Stop </span>email notifications
                      for news about the stocks in your watchlist.
                    </div>
                  </li>
                  <li
                    class="p-2 rounded-lg flex gap-2 items-center text-xs font-light text-error/70 bg-primary-content"
                  >
                    <NoSymbolIcon class="size-3" />
                    <div>
                      Permanently
                      <span class="font-bold">remove</span>
                      your access to stock market data.
                    </div>
                  </li>
                  <li
                    class="p-2 rounded-lg flex gap-2 items-center text-xs font-light text-error/70 bg-primary-content"
                  >
                    <NoSymbolIcon class="size-3" />
                    <div>
                      <span class="font-bold">Delete</span>
                      your account and all associated data.
                    </div>
                  </li>
                </ul>
                <div class="mt-8 flex flex-col gap-1 w-full">
                  <label
                    class="text-md font-light text-secondary"
                    for="password"
                    >To proceed, please enter your password:</label
                  >
                  <input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    class="input border-neutral shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
                  />
                </div>
                <div class="mt-8 mb-2 w-full">
                  <div class="w-full">
                    <div class="flex gap-4 justify-between items-center">
                      <button
                        class="btn px-8 bg-error rounded-md shadow-none border-none transition duration-300 ease-in-out z-10 hover:brightness-125"
                        @click="deleteAccountHandler"
                      >
                        <span class="text-error-content">Delete</span>
                      </button>
                      <button
                        class="btn px-8 bg-neutral-content rounded-md shadow-none border-none transition duration-300 ease-in-out z-10 hover:brightness-125"
                        @click="closeDialog"
                      >
                        <span class="text-error-content">Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>
