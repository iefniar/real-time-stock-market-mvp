<template>
  <div ref="container" class="tradingview-widget-container w-full">
    <div class="tradingview-widget-container__widget w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

// Types
type Theme = "light" | "dark";

interface TabSymbol {
  s: string;
  d?: string;
}

interface Tab {
  title: string;
  symbols: TabSymbol[];
}

interface Props {
  theme?: Theme;
  width?: string | number;
  height?: string | number;
  tabs?: Tab[];
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  theme: "dark",
  width: "100%",
  height: "100%",
  tabs: () => [
    {
      title: "Indices",
      symbols: [
        { s: "FOREXCOM:SPXUSD", d: "S&P 500 Index" },
        { s: "FOREXCOM:NSXUSD", d: "US 100" },
        { s: "FOREXCOM:DJI", d: "Dow Jones" },
      ],
    },
    {
      title: "Forex",
      symbols: [
        { s: "FX:EURUSD", d: "EUR/USD" },
        { s: "FX:GBPUSD", d: "GBP/USD" },
      ],
    },
  ],
});

// DOM ref
const container = ref<HTMLDivElement | null>(null);

let observer: IntersectionObserver | null = null
let hasLoaded = false

// Load widget
const loadWidget = (): void => {
  if (!container.value || hasLoaded) return;

  hasLoaded = true
  container.value.innerHTML = "";

  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    colorTheme: props.theme,
    dateRange: "12M",
    locale: "en",
    largeChartUrl: "",
    isTransparent: true, // to remove the background color
    showFloatingTooltip: false,
    plotLineColorGrowing: "rgba(99, 102, 241, 1)",
    plotLineColorFalling: "rgba(99, 102, 241, 1)",
    gridLineColor: "rgba(0,0,0,0)",
    scaleFontColor: "#6B7280",

    belowLineFillColorGrowing: "rgba(99, 102, 241, 0.12)",
    belowLineFillColorFalling: "rgba(99, 102, 241, 0.12)",
    belowLineFillColorGrowingBottom: "rgba(99, 102, 241, 0)",
    belowLineFillColorFallingBottom: "rgba(99, 102, 241, 0)",

    symbolActiveColor: "rgba(99, 102, 241, 0.12)",

    tabs: props.tabs,

    support_host: "https://www.tradingview.com",

    backgroundColor: "rgb(3,7,18)", // not working
    width: props.width,
    height: props.height,

    showSymbolLogo: true,
    showChart: true,
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
    props.theme,
    props.tabs,
    props.width,
    props.height
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