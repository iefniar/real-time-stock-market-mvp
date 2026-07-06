<template>
  <!-- Trigger -->
  <button
    class="w-full flex items-center justify-between py-4.5 sm:py-1 px-3 sm:px-2 rounded-xl cursor-pointer transition delay-150 duration-300 ease-in-out hover:bg-neutral"
    @click="open = true"
  >
    <div>{{ label }}</div>
    <MagnifyingGlassIcon class="size-5" />
  </button>
  <!-- Modal -->
  <dialog class="modal" :class="{ 'modal-open': open }">
    <div class="modal-box rounded-2xl bg-secondary-content relative max-h-[80dvh] p-0 border-neutral border inset-shadow-sm inset-shadow-neutral">
      <div class="sticky top-0 z-10 bg-secondary-content py-1 pl-4 pr-2 border-b">
        <div class="modal-action mt-0">
          <button
            class="cursor-pointer transition duration-300 ease-in-out hover:text-accent hover:drop-shadow-lg/50 hover:drop-shadow-accent"
            @click="closeDialog"
          >
            <XMarkIcon class="size-6" />
          </button>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search stocks..."
          class="w-full focus:outline-none"
        />
      </div>
      <div class="mt-4 p-4 pt-0">
        <div v-if="loading" class="flex gap-4 justify-center items-center">
          <div>Loading stocks...</div>
          <span class="loading loading-spinner loading-sm bg-accent" />
        </div>
        <div v-else-if="displayStocks.length === 0" class="text-center">
          {{ isSearchMode ? 'No results found' : 'No stocks available' }}
        </div>
        <div v-else>
          <div class="font-bold mb-2">
            {{ isSearchMode ? 'Search results' : 'Popular stocks' }}

            ({{ displayStocks.length }})
          </div>
          <ul class="space-y-2">
            <li v-for="stock in displayStocks" :key="stock.symbol">
              <RouterLink
                :to="`/stocks/${stock.symbol}`"
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary"
                @click="handleSelectStock"
              >
                <ArrowTrendingUpIcon class="w-5 h-5 text-gray-700" />
                <div>
                  <div class="font-medium">
                    {{ stock.name }}
                  </div>
                  <div class="text-sm text-gray-700">
                    {{ stock.symbol }}
                    |
                    {{ stock.exchange }}
                    |
                    {{ stock.type }}
                  </div>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

import { RouterLink } from 'vue-router'

import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

import { XMarkIcon } from '@heroicons/vue/24/solid'

import { ArrowTrendingUpIcon } from '@heroicons/vue/24/outline'

import type { StockWithWatchlistStatus } from '@/types/global'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Search stock'
  }
)

const open = ref(false)

const searchTerm = ref('')

const loading = ref(false)

const stocks = ref<StockWithWatchlistStatus[]>([])

const popularStocks = ref<StockWithWatchlistStatus[]>([])

const isSearchMode = computed(() => searchTerm.value.trim().length > 0)

const displayStocks = computed(() =>
  isSearchMode.value ? stocks.value : popularStocks.value.slice(0, 10)
)

let timeout: number

watch(searchTerm, () => {
  clearTimeout(timeout)

  timeout = setTimeout(handleSearch, 500)
})

async function loadPopularStocks() {
  loading.value = true

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/finnhub/stocks/search`
    )

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }

    const data = await response.json()

    console.log('Popular stocks:', data)

    popularStocks.value = data
  } catch (error) {
    console.error('Popular stock error:', error)

    popularStocks.value = []
  }

  loading.value = false
}

async function handleSearch() {
  if (!isSearchMode.value) {
    stocks.value = []
    return
  }

  loading.value = true

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/finnhub/stocks/search?q=${
        searchTerm.value
      }`
    )

    stocks.value = await response.json()
  } catch {
    stocks.value = []
  }

  loading.value = false
}

function handleSelectStock() {
  closeDialog()
}

function closeDialog() {
  open.value = false
  searchTerm.value = ''
  stocks.value = []
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()

    open.value = !open.value
  }
}

onMounted(() => {
  loadPopularStocks()

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
