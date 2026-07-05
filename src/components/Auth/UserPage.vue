<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authClient } from '@/lib/auth-client'
import { type User } from '@/types/global'
import { GlobeAmericasIcon } from '@heroicons/vue/24/solid'
import { DocumentCurrencyPoundIcon } from '@heroicons/vue/24/solid'
import { ShieldExclamationIcon } from '@heroicons/vue/24/solid'
import { SwatchIcon } from '@heroicons/vue/24/solid'
import { ArchiveBoxXMarkIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

const user = ref<User | null>(null)

onMounted(async () => {
  const session = await authClient.getSession()

  if (!session?.data?.user) {
    router.push({ name: 'logIn' })
    return
  }

  user.value = {
    id: session.data.user.id,
    name: session.data.user.name,
    email: session.data.user.email
  }
})
</script>

<template>
  <div v-if="user">
    <div class="flex flex-col items-center">
      <div class="flex flex-col py-4 gap-6">
        <div class="flex items-center gap-4">
          <img
            src="@/assets/soul-monkey-black-bg-avatar.png"
            alt="user avatar"
            class="w-30 h-30 object-cover rounded-full"
          />
          <div class="flex flex-col gap-1">
            <p class="archivo-black-regular text-info-content text-4xl">
              {{ user.name }}
            </p>
            <p class="text-secondary text-xs">{{ user.email }}</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div
            class="flex flex-col min-w-48 gap-10 py-2 px-3 bg-neutral/50 rounded-2xl border-neutral-content border inset-shadow-sm inset-shadow-neutral-content drop-shadow-xl/15 drop-shadow-primary"
          >
            <div class="flex items-center gap-1 text-secondary/75 text-xs">
              <GlobeAmericasIcon class="size-3" />
              <div>Country</div>
            </div>
            <div class="text-info-content text-sm text-end">France</div>
          </div>
          <div
            class="flex flex-col min-w-48 gap-10 py-2 px-3 bg-neutral/50 rounded-2xl border-neutral-content border inset-shadow-sm inset-shadow-neutral-content drop-shadow-xl/15 drop-shadow-primary"
          >
            <div class="flex items-center gap-1 text-secondary/75 text-xs">
              <DocumentCurrencyPoundIcon class="size-3" />
              <div>Investment Goals</div>
            </div>
            <div class="text-info-content text-sm text-end">Balanced</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div
            class="flex flex-col min-w-48 gap-10 py-2 px-3 bg-neutral/50 rounded-2xl border-neutral-content border inset-shadow-sm inset-shadow-neutral-content drop-shadow-xl/15 drop-shadow-primary"
          >
            <div class="flex items-center gap-1 text-secondary/75 text-xs">
              <ShieldExclamationIcon class="size-3" />
              <div>Risk Tolerance</div>
            </div>
            <div class="text-info-content text-sm text-end">Medium</div>
          </div>
          <div
            class="flex flex-col min-w-48 gap-10 py-2 px-3 bg-neutral/50 rounded-2xl border-neutral-content border inset-shadow-sm inset-shadow-neutral-content drop-shadow-xl/15 drop-shadow-primary"
          >
            <div class="flex items-center gap-1 text-secondary/75 text-xs">
              <SwatchIcon class="size-3" />
              <div>Preferred Industry</div>
            </div>
            <div class="text-info-content text-sm text-end">Consumer Goods</div>
          </div>
        </div>
        <div class="self-end">
          <button
            class="btn bg-error shadow-none border-none drop-shadow-lg/50 drop-shadow-error transition duration-300 ease-in-out z-10 hover:brightness-125"
          >
            <ArchiveBoxXMarkIcon class="size-3" />
            <span class="text-error-content font-normal">Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
