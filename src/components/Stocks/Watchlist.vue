<template>
  <!-- Empty state -->
  <section
    v-if="watchlist.length === 0"
    class="flex flex-col items-center justify-center gap-6 py-16"
  >
    <StarIcon class="size-16 text-yellow-400" />
    <div class="text-center">
      <h2 class="text-2xl font-bold">Your watchlist is empty</h2>
      <p class="mt-2 text-base-content/70 max-w-md">
        Start building your watchlist by searching for stocks and clicking the
        star icon.
      </p>
    </div>
    <SearchCommand @watchlist-updated="loadWatchlist" />
  </section>
  <!-- Watchlist -->
  <section v-else class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold">Watchlist</h2>
      <SearchCommand @watchlist-updated="loadWatchlist" />
    </div>
    <WatchlistTable :watchlist="watchlist" @removed="loadWatchlist" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import SearchCommand from '../UI/SearchCommand.vue'
import WatchlistTable from './WatchlistTable.vue'
import type { StockWithData } from '@/types/global'

const watchlist = ref<StockWithData[]>([])

async function loadWatchlist() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/watchlist/data`,
      {
        credentials: 'include'
      }
    )
    if (!response.ok) {
      throw new Error('Failed to load watchlist')
    }
    watchlist.value = await response.json()
  } catch (error) {
    console.error(error)
    watchlist.value = []
  }
}

onMounted(() => {
  loadWatchlist()
})
</script>
