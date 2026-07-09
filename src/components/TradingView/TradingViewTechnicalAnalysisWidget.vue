<template>
  <div ref="container" class="w-full h-full">
    <tv-technical-analysis ref="widget" :symbol="symbol" :theme="theme" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Types
type Theme = 'light' | 'dark'

interface Props {
  symbol?: string
  theme?: Theme
}

const props = withDefaults(defineProps<Props>(), {
  symbol: 'NASDAQ:AAPL',
  theme: 'dark'
})

const widget = ref<HTMLElement | null>(null)

let scriptLoaded = false

async function loadScript() {
  if (scriptLoaded) return

  if (
    document.querySelector(
      'script[src="https://widgets.tradingview-widget.com/w/en/tv-technical-analysis.js"]'
    )
  ) {
    scriptLoaded = true
    return
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')

    script.type = 'module'

    script.src =
      'https://widgets.tradingview-widget.com/w/en/tv-technical-analysis.js'

    script.onload = () => {
      scriptLoaded = true
      resolve()
    }

    script.onerror = () => reject()

    document.head.appendChild(script)
  })
}

function updateWidget() {
  if (!widget.value) return

  widget.value.setAttribute('symbol', props.symbol)

  widget.value.setAttribute('theme', props.theme)
}

onMounted(async () => {
  await loadScript()

  updateWidget()
})

watch(() => [props.symbol, props.theme] as const, updateWidget)
</script>
