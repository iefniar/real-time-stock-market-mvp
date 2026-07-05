<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/solid'
import { StarIcon } from '@heroicons/vue/24/solid'
import SearchCommand from '@/components/UI/SearchCommand.vue'
</script>

<template>
  <div class="px-2 py-6 z-20">
    <div class="flex gap-2 mb-3 px-2 pb-3">
      <img src="@/assets/avatar.png" alt="logo" class="w-5 h-5" />
      <div class="text-primary">
        <span class="text-secondary">RealTime</span>Market
      </div>
    </div>
    <ul class="flex flex-col gap-y-3 text-primary">
      <li>
        <SearchCommand />
      </li>
      <li>
        <router-link
          class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral"
          :to="{ name: 'home' }"
        >
          <HomeIcon class="size-5" />
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link
          class="flex items-center gap-2 py-1 px-2 rounded-xl transition delay-150 duration-300 ease-in-out hover:bg-neutral"
          to="/watchlist"
        >
          <StarIcon class="size-5" />
          Watchlist
        </router-link>
      </li>
    </ul>
  </div>
</template>
