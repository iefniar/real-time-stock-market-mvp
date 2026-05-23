<template>
  <div ref="container" class="tradingview-widget-container w-full">
    <div class="tradingview-widget-container__widget w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

// Types
type Theme = "light" | "dark";
type DataSource = "SPX500" | "NASDAQ100" | "DOW30" | string;

interface Props {
  theme?: Theme;
  dataSource?: DataSource;
  width?: string | number;
  height?: string | number;
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  theme: "dark",
  dataSource: "SPX500",
  width: "100%",
  height: "100%",
});

// DOM ref
const container = ref<HTMLDivElement | null>(null);

// Load widget
const loadWidget = (): void => {
  if (!container.value) return;

  container.value.innerHTML = "";

  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    dataSource: props.dataSource,
    blockSize: "market_cap_basic",
    blockColor: "change",
    grouping: "sector",
    locale: "en",
    symbolUrl: "",
    colorTheme: props.theme,
    exchanges: [],
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: props.width,
    height: props.height,
  });

  container.value.appendChild(script);

};

// lifecycle
onMounted(loadWidget);

watch(
  () => [props.theme, props.dataSource, props.width, props.height] as const,
  loadWidget
);

onBeforeUnmount((): void => {
  if (container.value) {
    container.value.innerHTML = "";
  }
});
</script>
