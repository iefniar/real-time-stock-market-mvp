<template>
  <div
    ref="container"
    class="tradingview-widget-container w-full"
  >
    <div class="tradingview-widget-container__widget w-full"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
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
  width?: string | number;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    symbol: "NASDAQ:AAPL",
    theme: "dark",
    locale: "en",
    width: 550
  }
);

const container =
  ref<HTMLDivElement | null>(null);

// Load widget
const loadWidget = (): void => {
  if (!container.value) return;

  container.value.innerHTML = "";

  // Widget container
  const widget =
    document.createElement("div");

  widget.className =
    "tradingview-widget-container__widget w-full";

  container.value.appendChild(widget);

  // Script
  const script =
    document.createElement("script");

  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";

  script.type = "text/javascript";

  script.async = true;

  script.innerHTML = JSON.stringify({
    symbol: props.symbol,
    colorTheme: props.theme,
    isTransparent: false,
    locale: props.locale,
    width: props.width,
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
      props.width
    ] as const,
  loadWidget
);

onBeforeUnmount((): void => {
  if (container.value) {
    container.value.innerHTML = "";
  }
});
</script>
