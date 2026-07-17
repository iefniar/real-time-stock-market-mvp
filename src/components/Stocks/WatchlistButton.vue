<template>
  <!-- Icon version -->
  <button
    v-if="type === 'icon'"
    :title="buttonTitle"
    :aria-label="buttonTitle"
    class="cursor-pointer transition duration-300 hover:text-accent"
    @click.stop.prevent="toggleWatchlist"
  >
    <TrashIcon
      v-if="showTrashIcon && isInWatchlist"
      class="size-5 text-error hover:text-accent hover:drop-shadow-lg/50 hover:drop-shadow-neutral"
    />
    <StarIcon
      v-else
      class="size-5"
      :class="isInWatchlist ? 'text-accent' : ''"
    />
  </button>
  <!-- Button version -->
  <button
    v-else
    class="btn shadow-none border-none transition duration-300 ease-in-out hover:brightness-150"
    :class="isInWatchlist ? 'btn-error' : 'btn-primary'"
    @click.stop.prevent="toggleWatchlist"
  >
    <TrashIcon v-if="showTrashIcon && isInWatchlist" class="size-4" />
    <div class="text-primary-content hidden sm:flex">
      {{ isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist' }}
    </div>
    <div class="text-primary-content flex sm:hidden">
      {{ isInWatchlist ? 'Remove' : 'Add' }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { StarIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { useWatchlistStore } from '@/stores/watchlist'

interface Props {
  symbol: string

  company: string

  isInWatchlist: boolean

  showTrashIcon?: boolean

  type?: 'button' | 'icon'
}

const props = withDefaults(defineProps<Props>(), {
  showTrashIcon: false,

  type: 'button'
})

const emit = defineEmits<{
  (e: 'watchlist-change', symbol: string, isAdded: boolean): void
}>()

const buttonTitle = computed(() =>
  props.isInWatchlist
    ? `Remove ${props.symbol} from watchlist`
    : `Add ${props.symbol} to watchlist`
)

const watchlistStore = useWatchlistStore()

async function toggleWatchlist() {
  try {
    const response = await fetch(
      props.isInWatchlist
        ? `${import.meta.env.VITE_BACKEND_URL}/api/watchlist/${props.symbol}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/watchlist`,
      {
        method: props.isInWatchlist ? 'DELETE' : 'POST',

        credentials: 'include',

        headers: {
          'Content-Type': 'application/json'
        },

        body: props.isInWatchlist
          ? undefined
          : JSON.stringify({
              symbol: props.symbol,
              company: props.company
            })
      }
    )

    if (!response.ok) {
      throw new Error('Request failed')
    }

    const isAdded = !props.isInWatchlist

    watchlistStore.updateStock(props.symbol, isAdded)

    await watchlistStore.refresh()

    emit('watchlist-change', props.symbol, isAdded)
  } catch (error) {
    console.error('Watchlist error:', error)
  }
}
</script>
