<template>
  <div class="flex flex-col gap-4 xl:px-16">
    <!-- Empty state -->
    <section
      v-if="watchlistStore.watchlist.length === 0"
      class="flex flex-col items-center justify-center gap-6 p-4"
    >
      <StarIcon class="size-16 text-primary" />
      <div class="text-center text-primary">
        <h2 class="text-2xl font-bold text-secondary">
          Your watchlist is empty
        </h2>
        <p class="text-secondary/70 max-w-md mt-4 mb-8">
          Start building your watchlist by searching for stocks and clicking the
          star icon.
        </p>
        <SearchCommand type="icon" />
      </div>
    </section>
    <!-- Watchlist -->
    <section v-else class="space-y-6">
      <div>
        <h3 class="text-lg text-secondary">Watchlist</h3>
      </div>
      <WatchlistTable
        :watchlist="watchlistStore.watchlist"
        @news-email-updated="handleNewsEmailUpdated"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import SearchCommand from '../UI/SearchCommand.vue'
import WatchlistTable from './WatchlistTable.vue'
import { useWatchlistStore } from '@/stores/watchlist'

const watchlistStore = useWatchlistStore()

function handleNewsEmailUpdated(symbol: string, isNewsViaEmailActive: boolean) {
  const stock = watchlistStore.watchlist.find(stock => stock.symbol === symbol)

  if (stock) {
    stock.isNewsViaEmailActive = isNewsViaEmailActive
  }
}

onMounted(() => {
  watchlistStore.loadWatchlist()
})
</script>
