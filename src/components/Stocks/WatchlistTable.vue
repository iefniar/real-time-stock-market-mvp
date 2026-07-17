<template>
  <div
    class="overflow-x-auto px-2 py-4 rounded-xl border-neutral-content border bg-secondary-content"
  >
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
            <button
              class="btn w-full shadow-none border-none transition duration-300 ease-in-out hover:drop-shadow-lg/50 hover:drop-shadow-neutral"
              :class="item.isNewsViaEmailActive ? 'bg-accent text-primary-content' : 'bg-primary-content text-accent'"
              @click.stop="toggleNewsViaEmail(item.symbol)"
            >
              {{ item.isNewsViaEmailActive ? 'Disable News' : 'Enable News' }}
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
  (e: 'news-email-updated', symbol: string, isNewsViaEmailActive: boolean): void
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

async function toggleNewsViaEmail(symbol: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/watchlist/${symbol}/news-email`,
      {
        method: 'PATCH',
        credentials: 'include'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update email notifications')
    }

    const data = await response.json()

    emit('news-email-updated', symbol, data.isNewsViaEmailActive)
  } catch (error) {
    console.error(error)
  }
}
</script>
