<script setup lang="ts">
import TradingViewChartWidget from '@/components/TradingView/TradingViewChartWidget.vue'
import TradingViewMarketOverviewWidget from '@/components/TradingView/TradingViewMarketOverviewWidget.vue'
import TradingViewStockHeatmapWidget from '@/components/TradingView/TradingViewStockHeatmapWidget.vue'
import TradingViewMarketDataWidget from '@/components/TradingView/TradingViewMarketDataWidget.vue'
</script>

<template>
  <div class="flex flex-col gap-4 xl:px-16">
    <h3 class="text-lg text-secondary">Stock Heatmap</h3>
    <div class="flex gap-4 flex-col h-75 md:h-100 mb-4">
      <TradingViewStockHeatmapWidget />
    </div>
    <div class="flex gap-4 flex-col md:flex-row h-200 md:h-100">
      <div class="flex-1 flex flex-col gap-4 mb-4">
        <h3 class="text-lg text-secondary">Market Data</h3>
        <TradingViewMarketDataWidget />
      </div>
      <div class="flex-1 flex flex-col gap-4 mb-4">
        <h3 class="text-lg text-secondary">Market Overview</h3>
        <div class="flex-1 border border-neutral-content">
          <TradingViewMarketOverviewWidget />
        </div>
      </div>
    </div>
    <div class="flex gap-4 flex-col md:flex-row h-200 md:h-100">
      <div class="flex-1 flex flex-col gap-4 mb-4">
        <h3 class="text-lg text-secondary">Apple Chart</h3>
        <TradingViewChartWidget symbol="NASDAQ:AAPL" />
      </div>
      <div class="flex-1 flex flex-col gap-4 mb-4">
        <h3 class="text-lg text-secondary">Tesla Chart</h3>
        <TradingViewChartWidget symbol="NASDAQ:TSLA" />
      </div>
    </div>
  </div>
</template>
