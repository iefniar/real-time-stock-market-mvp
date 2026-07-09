<template>
  <div
    ref="container"
    class="tradingview-widget-container w-full h-full"
  >
    <div class="tradingview-widget-container__widget w-full"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  onBeforeUnmount
} from "vue";

// Types
type Theme = "light" | "dark";

interface Props {
  symbol?: string;
  theme?: Theme;
  locale?: string;
  width?: number | string;
  height?: number | string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    symbol: "NASDAQ:AAPL",
    theme: "dark",
    locale: "en",
    width: 400,
    height: 550
  }
);

const container =
  ref<HTMLDivElement | null>(null);

// Load TradingView widget
const loadWidget = (): void => {
  if (!container.value) return;

  container.value.innerHTML = "";

  const script =
    document.createElement("script");

  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";

  script.type =
    "text/javascript";

  script.async = true;

  script.innerHTML = JSON.stringify({
    symbol: props.symbol,
    colorTheme: props.theme,
    displayMode: "regular",
    isTransparent: false,
    locale: props.locale,
    width: props.width,
    height: props.height,
  });

  container.value.appendChild(script);
};

// Lifecycle
onMounted(loadWidget);

watch(
  () =>
    [
      props.symbol,
      props.theme,
      props.locale,
      props.width,
      props.height
    ] as const,
  loadWidget
);

onBeforeUnmount((): void => {
  if (container.value) {
    container.value.innerHTML = "";
  }
});
</script>
