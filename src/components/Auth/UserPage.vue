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
import InfoCard from '../UI/InfoCard.vue'

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
    email: session.data.user.email,
    country: session.data.user.country,
    investmentGoals: session.data.user.investmentGoals,
    riskTolerance: session.data.user.riskTolerance,
    preferredIndustry: session.data.user.preferredIndustry
  }
})
</script>

<template>
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
            >
              <ArchiveBoxXMarkIcon class="size-3" />
              <span class="text-error-content font-normal">Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
