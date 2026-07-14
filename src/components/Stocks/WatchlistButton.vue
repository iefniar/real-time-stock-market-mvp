<template>
  <!-- Icon version -->
  <button
    v-if="type === 'icon'"
    :title="buttonTitle"
    :aria-label="buttonTitle"
    class="cursor-pointer transition duration-300 hover:text-yellow-400"
    @click.stop.prevent="toggleWatchlist"
  >
    <TrashIcon
      v-if="showTrashIcon && isInWatchlist"
      class="size-5 text-red-500"
    />
    <StarIcon
      v-else
      class="size-5"
      :class="isInWatchlist ? 'text-yellow-400 fill-yellow-400' : ''"
    />
  </button>
  <!-- Button version -->
  <button
    v-else
    class="btn"
    :class="isInWatchlist ? 'btn-error' : 'btn-warning'"
    @click.stop.prevent="toggleWatchlist"
  >
    <TrashIcon v-if="showTrashIcon && isInWatchlist" class="size-4" />
    {{ isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist' }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { StarIcon, TrashIcon } from '@heroicons/vue/24/solid'

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

    emit('watchlist-change', props.symbol, !props.isInWatchlist)
  } catch (error) {
    console.error('Watchlist error:', error)
  }
}
</script>
