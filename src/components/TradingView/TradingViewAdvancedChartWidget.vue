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

// Load TradingView widget
const loadWidget = (): void => {
  if (!container.value) return;

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

// Lifecycle
onMounted(loadWidget);

watch(
  () => [props.symbol, props.interval, props.theme, props.timezone] as const,
  loadWidget
);

onBeforeUnmount((): void => {
  if (container.value) {
    container.value.innerHTML = "";
  }
});
</script>
