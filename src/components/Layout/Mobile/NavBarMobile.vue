<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/outline'
import { BellIcon } from '@heroicons/vue/24/outline'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="fixed top-0 left-0 w-full bg-primary-content px-4 pt-8 border-b border-b-neutral z-20">
    <div class="flex mb-2 justify-between items-center">
      <div class="flex gap-2">
        <img src="@/assets/avatar.png" alt="logo" class="w-5 h-5" />
        <div class="text-primary font-semibold">
          <span class="text-secondary">RealTime</span>Market
        </div>
      </div>
      <div>
        <div class="dropdown dropdown-end">
          <img src="@/assets/avatar.png" alt="logo" tabindex="0" role="button" class="cursor-pointer w-8 h-8 object-cover rounded-full" />
          <ul
            tabindex="-1"
            class="dropdown-content menu bg-secondary-content rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li><a class="hover:bg-neutral active:text-accent text-primary">Item 1</a></li>
            <li><a class="hover:bg-neutral active:text-accent text-primary">Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 w-full bg-primary-content px-4 pb-8 z-20">
    <ul class="flex w-full justify-between pt-4 border-t border-t-neutral">
      <li>
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-primary"
          :to="{ name: 'home' }"
        >
          <HomeIcon class="size-5" />
          <div class="text-sm">Dashboard</div>
        </router-link>
      </li>
      <li>
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-primary"
          to="/markets"
        >
          <ChartBarIcon class="size-5" />
          <div class="text-sm">Markets</div>
        </router-link>
      </li>
      <li>
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-primary"
          to="/watchlist"
        >
          <StarIcon class="size-5" />
          <div class="text-sm">Watchlist</div>
        </router-link>
      </li>
      <li>
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-primary"
          to="/alerts"
        >
          <BellIcon class="size-5" />
          <div class="text-sm">Alerts</div>
        </router-link>
      </li>
      <li>
        <router-link
          class="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-primary"
          to="/settings"
        >
          <Cog6ToothIcon class="size-5" />
          <div class="text-sm">Settings</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
