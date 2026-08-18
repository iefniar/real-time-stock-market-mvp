import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { StockWithData, StockWithWatchlistStatus } from '@/types/global'

export const useWatchlistStore = defineStore('watchlist', () => {
  const MAX_WATCHLIST_STOCKS = 5

  const watchlist = ref<StockWithData[]>([])

  const popularStocks = ref<StockWithWatchlistStatus[]>([])

  const loading = ref(false)

  const watchlistLimitReached = computed(() => {
    return watchlist.value.length >= MAX_WATCHLIST_STOCKS
  })

  async function loadWatchlist () {
    console.log('🟢 loadWatchlist START')

    loading.value = true

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

      const data = await response.json()

      console.table(
        data.map((stock: StockWithData) => ({
          symbol: stock.symbol,
          company: stock.company,
          price: stock.priceFormatted,
          change: stock.changeFormatted,
          marketCap: stock.marketCap,
          pe: stock.peRatio
        }))
      )

      watchlist.value = data

      console.table(
        watchlist.value.map(stock => ({
          symbol: stock.symbol,
          price: stock.priceFormatted,
          change: stock.changeFormatted,
          marketCap: stock.marketCap,
          pe: stock.peRatio
        }))
      )

      console.log('🔵 WATCHLIST STATE AFTER UPDATE:', watchlist.value)
    } catch (error) {
      console.error('🔴 loadWatchlist ERROR:', error)

      watchlist.value = []
    }

    loading.value = false

    console.log('🟣 loadWatchlist END')
  }

  async function loadPopularStocks () {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/finnhub/stocks/search`,
        {
          credentials: 'include'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to load stocks')
      }

      popularStocks.value = await response.json()
    } catch (error) {
      console.error(error)

      popularStocks.value = []
    }
  }

  function updateStock (symbol: string, isAdded: boolean) {
    popularStocks.value = popularStocks.value.map(stock =>
      stock.symbol === symbol
        ? {
            ...stock,
            isInWatchlist: isAdded
          }
        : stock
    )

    if (!isAdded) {
      watchlist.value = watchlist.value.filter(stock => stock.symbol !== symbol)
    }
  }

  async function refresh () {
    await Promise.all([loadWatchlist(), loadPopularStocks()])
  }

  return {
    MAX_WATCHLIST_STOCKS,
    watchlist,
    popularStocks,
    loading,
    watchlistLimitReached,
    loadWatchlist,
    loadPopularStocks,
    updateStock,
    refresh
  }
})
