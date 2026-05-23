<template>
  <div ref="container" class="tradingview-widget-container w-full">
    <div class="tradingview-widget-container__widget w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

// Types
type Theme = "light" | "dark";

interface SymbolItem {
  name: string;
  displayName?: string;
}

interface SymbolGroup {
  name: string;
  symbols: SymbolItem[];
}

interface Props {
  theme?: Theme;
  width?: string | number;
  height?: string | number;
  groups?: SymbolGroup[];
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  theme: "dark",
  width: "100%",
  height: "100%",
  groups: () => [
    {
      name: "Indices",
      symbols: [
        { name: "FOREXCOM:SPXUSD", displayName: "S&P 500" },
        { name: "FOREXCOM:NSXUSD", displayName: "US 100" },
        { name: "FOREXCOM:DJI", displayName: "Dow Jones" },
      ],
    },
    {
      name: "Forex",
      symbols: [
        { name: "FX:EURUSD", displayName: "EUR/USD" },
        { name: "FX:GBPUSD", displayName: "GBP/USD" },
      ],
    },
  ],
});

// DOM ref
const container = ref<HTMLDivElement | null>(null);

// Load widget
const loadWidget = (): void => {
  if (!container.value) return;

  container.value.innerHTML = "";

  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    colorTheme: props.theme,
    locale: "en",
    largeChartUrl: "",
    isTransparent: false,
    showSymbolLogo: true,
    backgroundColor: "rgb(3,7,18)",
    support_host: "https://www.tradingview.com",
    width: props.width,
    height: props.height,
    symbolsGroups: props.groups,
  });

  container.value.appendChild(script);
};

// lifecycle
onMounted(loadWidget);

watch(
  () => [props.theme, props.width, props.height, props.groups] as const,
  loadWidget
);

onBeforeUnmount((): void => {
  if (container.value) {
    container.value.innerHTML = "";
  }
});
</script>