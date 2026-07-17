<template>
  <div class="flex min-h-screen flex-col lg:flex-row gap-4 xl:px-16">
    <div class="lg:w-1/2 flex flex-col gap-4">
      <div class="w-full border border-neutral-content">
        <TradingViewSymbolInfoWidget :symbol="symbol" />
      </div>
      <div class="w-full h-80 lg:h-full border border-neutral-content">
        <TradingViewFundamentalDataWidget :symbol="symbol" />
      </div>
    </div>
    <div class="lg:w-1/2 flex flex-col gap-4">
      <div class="flex justify-end">
        <WatchlistButton
          v-if="stock"
          :symbol="stock.symbol"
          :company="stock.company"
          :is-in-watchlist="isInWatchlist"
          @watchlist-change="handleWatchlistChange"
        />
      </div>
      <div>
        <TradingViewCompanyProfileWidget :symbol="symbol" />
      </div>
      <div>
        <TradingViewTechnicalAnalysisWidget :symbol="symbol" />
      </div>
      <div class="h-80">
        <TradingViewAdvancedChartWidget :symbol="symbol" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import TradingViewSymbolInfoWidget from '@/components/TradingView/TradingViewSymbolInfoWidget.vue'
import TradingViewAdvancedChartWidget from '@/components/TradingView/TradingViewAdvancedChartWidget.vue'
import TradingViewTechnicalAnalysisWidget from '@/components/TradingView/TradingViewTechnicalAnalysisWidget.vue'
import TradingViewCompanyProfileWidget from '@/components/TradingView/TradingViewCompanyProfileWidget.vue'
import TradingViewFundamentalDataWidget from '@/components/TradingView/TradingViewFundamentalDataWidget.vue'
import WatchlistButton from './WatchlistButton.vue'
import type { StockDetails } from '@/types/global.ts'
import { useWatchlistStore } from '@/stores/watchlist'

interface Props {
  symbol: string
}

const props = defineProps<Props>()

const watchlistStore = useWatchlistStore()

const stock = ref<StockDetails | null>(null)

const isInWatchlist = computed(() =>
  watchlistStore.watchlist.some(stock => stock.symbol === props.symbol)
)

const loading = ref(true)

const error = ref('')

async function loadPage() {
  loading.value = true

  try {
    // Fetch stock details
    const stockResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/finnhub/stocks/${props.symbol}`
    )

    if (!stockResponse.ok) {
      throw new Error('Failed to load stock.')
    }

    stock.value = await stockResponse.json()

    await watchlistStore.loadWatchlist()
  } catch (err) {
    console.error(err)

    error.value = 'Unable to load stock details.'
  } finally {
    loading.value = false
  }
}

async function handleWatchlistChange(symbol: string, isAdded: boolean) {
  watchlistStore.updateStock(symbol, isAdded)

  await watchlistStore.refresh()
}

onMounted(loadPage)
</script>
