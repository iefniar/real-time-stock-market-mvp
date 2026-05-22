<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/outline'
import { BellIcon } from '@heroicons/vue/24/outline'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="px-2 py-6 z-20">
    <div class="flex gap-2 mb-3 px-2 pb-3">
      <img src="@/assets/avatar.png" alt="logo" class="w-5 h-5" />
      <div class="text-primary font-semibold"><span class="text-secondary">RealTime</span>Market</div>
    </div>
    <ul class="flex flex-col gap-y-3 text-primary">
      <li>
        <router-link class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content" :to="{ name: 'home' }">
          <HomeIcon class="size-5" />
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content" to="/markets">
          <ChartBarIcon class="size-5" />
          Markets
        </router-link>
      </li>
      <li>
        <router-link class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content" to="/watchlist">
          <StarIcon class="size-5" />
          Watchlist
        </router-link>
      </li>
      <li>
        <router-link class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content" to="/alerts">
          <BellIcon class="size-5" />
          Alerts
        </router-link>
      </li>
      <li>
        <router-link class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-secondary-content" to="/settings">
          <Cog6ToothIcon class="size-5" />
          Settings
        </router-link>
      </li>
    </ul>
  </div>
</template>
