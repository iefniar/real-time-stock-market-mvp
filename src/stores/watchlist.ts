import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { StockWithData, StockWithWatchlistStatus } from '@/types/global'

export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlist = ref<StockWithData[]>([])

  const popularStocks = ref<StockWithWatchlistStatus[]>([])

  const loading = ref(false)

  async function loadWatchlist () {
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

      watchlist.value = await response.json()
    } catch (error) {
      console.error(error)

      watchlist.value = []
    }

    loading.value = false
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
    watchlist,
    popularStocks,
    loading,
    loadWatchlist,
    loadPopularStocks,
    updateStock,
    refresh
  }
})
