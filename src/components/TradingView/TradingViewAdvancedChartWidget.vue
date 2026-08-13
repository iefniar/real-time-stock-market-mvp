<template>
  <div ref="container" class="tradingview-widget-container w-full h-full">
    <div class="tradingview-widget-container__widget w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';

// Types
type Theme = "light" | "dark";

interface Props {
  symbol?: string;
  interval?: string;
  theme?: Theme;
  timezone?: string;
}

const props = withDefaults(defineProps<Props>(), {
  symbol: "NASDAQ:AAPL",
  interval: "D",
  theme: "dark",
  timezone: "Etc/UTC",
});

const container = ref<HTMLDivElement | null>(null);

let observer: IntersectionObserver | null = null
let hasLoaded = false  

// Load TradingView widget
const loadWidget = (): void => {
  if (!container.value || hasLoaded) return;

  hasLoaded = true
  container.value.innerHTML = "";

  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    symbol: props.symbol,
    interval: props.interval,
    timezone: props.timezone,
    theme: props.theme,
    allow_symbol_change: true,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    autosize: true,
    backgroundColor: "rgb(3,7,18)",
    gridColor: "rgba(99, 102, 241, 0.1)",
    style: 10,
  });

  container.value.appendChild(script);
};

const startObserving = (): void => {
  if (!container.value) return

  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0]

      if (entry?.isIntersecting) {
        loadWidget()

        observer?.disconnect()
        observer = null
      }
    },
    {
      root: null,

      // Load shortly before the user reaches the widget instead of waiting until it is completely visible.
      rootMargin: '300px',

      threshold: 0
    }
  )

  observer.observe(container.value)
}

onMounted(() => {
  startObserving()
})

watch(
  () => [
    props.symbol,
    props.interval,
    props.theme,
    props.timezone
  ] as const,
  () => {
    if (!hasLoaded) return

    hasLoaded = false

    loadWidget()
  }
)

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null

  if (container.value) {
    container.value.innerHTML = ''
  }
})
</script>
