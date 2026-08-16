<template>
  <div
    class="relative overflow-x-auto p-4 rounded-lg border-neutral-content border bg-secondary-content"
  >
    <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
    <table class="table relative">
      <div
        class="absolute inset-0 opacity-[0.1] dark:opacity-[0.1]"
        :style="patternStyle"
      ></div>
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
            <div
              class="tooltip"
              :class="
                item.isNewsViaEmailActive ? 'tooltip-light' : 'tooltip-dark'
              "
            >
              <div
                class="tooltip-content drop-shadow-lg/50 drop-shadow-neutral"
              >
                <div
                  v-if="item.isNewsViaEmailActive"
                  class="text-primary-content text-xs font-medium max-w-40"
                >
                  Disable to stop receiving this stock's news in your email
                </div>
                <div v-else class="text-accent text-xs font-medium max-w-40">
                  Enable to start receiving this stock's news straight in your
                  email twice a week
                </div>
              </div>
              <button
                class="btn w-full min-w-40 shadow-none border-none transition duration-300 ease-in-out hover:drop-shadow-lg/50 hover:drop-shadow-neutral"
                :class="
                  item.isNewsViaEmailActive
                    ? 'bg-accent text-primary-content'
                    : 'bg-primary-content text-accent'
                "
                @click.stop="toggleNewsViaEmail(item.symbol)"
              >
                <div
                  v-if="item.isNewsViaEmailActive"
                  class="flex gap-2 items-center justify-center"
                >
                  <NoSymbolIcon class="size-4" />
                  Disable News
                </div>
                <div v-else class="flex gap-2 items-center justify-center">
                  <PowerIcon class="size-4" />
                  Enable News
                </div>
              </button>
            </div>
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
import { NoSymbolIcon, PowerIcon } from '@heroicons/vue/24/solid'

defineProps<{
  watchlist: StockWithData[]
}>()

const emit = defineEmits<{
  (e: 'removed'): void
  (e: 'news-email-updated', symbol: string, isNewsViaEmailActive: boolean): void
}>()

const patternStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      45deg,

      #3b82f6 0px,
      #3b82f6 1px,
      rgba(59,130,246,0) 1px,
      rgba(59,130,246,0) 10px,

      #8b5cf6 10px,
      #8b5cf6 11px,
      rgba(139,92,246,0) 11px,
      rgba(139,92,246,0) 20px,

      #ec4899 20px,
      #ec4899 21px,
      rgba(236,72,153,0) 21px,
      rgba(236,72,153,0) 30px
    )
  `,
  backgroundSize: '7px 7px'
}

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

<style scoped>
.tooltip-dark {
  --tt-bg: rgb(3, 7, 18) !important;
}
.tooltip-light {
  --tt-bg: rgb(238, 13, 223) !important;
}
</style>
