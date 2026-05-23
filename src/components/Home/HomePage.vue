<script setup lang="ts">
import DaisyBtn from '@/components/DaisyBtn.vue';
import TradingViewChartWidget from '@/components/TradingView/TradingViewChartWidget.vue';
import TradingViewMarketOverviewWidget from '@/components/TradingView/TradingViewMarketOverviewWidget.vue';
import TradingViewStockHeatmapWidget from '@/components/TradingView/TradingViewStockHeatmapWidget.vue';
import TradingViewMarketDataWidget from '@/components/TradingView/TradingViewMarketDataWidget.vue';
</script>

<template>
  <div class="bg-primary-content">
    <DaisyBtn />
  </div>

  <div class="h-50 sm:h-100">
    <TradingViewMarketDataWidget />
  </div>

  <div class="h-100 sm:h-200">
    <TradingViewStockHeatmapWidget />
  </div>

  <div class="h-100 sm:h-200 border border-neutral">
    <TradingViewMarketOverviewWidget />
  </div>

  <!-- Apple chart -->
  <div class="h-50 sm:h-100">
    <TradingViewChartWidget symbol="NASDAQ:AAPL" />
  </div>

  <!-- Tesla chart -->
  <div class="h-50 sm:h-100">
    <TradingViewChartWidget symbol="NASDAQ:TSLA" interval="60" />
  </div>

  <!-- Crypto example -->
  <div class="h-50 sm:h-100">
    <TradingViewChartWidget symbol="BINANCE:BTCUSDT" theme="dark" />
  </div>
</template>
