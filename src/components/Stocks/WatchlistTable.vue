<template>
  <div class="overflow-x-auto px-2 py-4 rounded-xl border-neutral-content border bg-secondary-content">
    <table class="table">
      <thead>
        <tr class="text-primary">
          <th>Company</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change</th>
          <th>Market Cap</th>
          <th>P/E</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in watchlist"
          :key="item.symbol"
          class="text-secondary cursor-pointer hover:bg-primary transition duration-300 ease-in-out"
          @click="goToStock(item.symbol)"
        >
          <td>{{ item.company }}</td>
          <td>{{ item.symbol }}</td>
          <td>
            {{ item.priceFormatted || '—' }}
          </td>
          <td :class="getChangeColorClass(item.changePercent)">
            {{ item.changeFormatted || '—' }}
          </td>
          <td>
            {{ item.marketCap || '—' }}
          </td>
          <td>
            {{ item.peRatio || '—' }}
          </td>
          <td>
            <button class="btn bg-accent w-full shadow-none border-none transition duration-300 ease-in-out hover:bg-primary-content hover:text-accent" @click.stop>
              Add Alert
            </button>
          </td>
          <td>
            <WatchlistButton
              :symbol="item.symbol"
              :company="item.company"
              :is-in-watchlist="true"
              :show-trash-icon="true"
              type="icon"
              @watchlist-change="handleWatchlistChange"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import WatchlistButton from './WatchlistButton.vue'

import { getChangeColorClass } from '@/utils/functions'

import type { StockWithData } from '@/types/global'

defineProps<{
  watchlist: StockWithData[]
}>()

const emit = defineEmits<{
  (e: 'removed'): void
}>()

const router = useRouter()

function goToStock(symbol: string) {
  router.push(`/stocks/${encodeURIComponent(symbol)}`)
}

function handleWatchlistChange(symbol: string, isAdded: boolean) {
  if (!isAdded) {
    emit('removed')
  }
}

</script>
