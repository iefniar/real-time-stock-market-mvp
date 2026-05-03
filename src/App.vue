<script setup lang="ts">
import DaisyBtn from '@/components/DaisyBtn.vue'
import TradingViewChartWidget from '@/components/TradingView/TradingViewChartWidget.vue'
import TradingViewMarketOverviewWidget from '@/components/TradingView/TradingViewMarketOverviewWidget.vue'
</script>

<template>
  <div class="bg-primary-content">
    <DaisyBtn />
  </div>

  <div class="w-2xl flex flex-col mx-auto">
    <TradingViewMarketOverviewWidget />
  </div>

  <div class="p-6 space-y-6">
    <!-- Apple chart -->
    <div class="h-96">
      <TradingViewChartWidget symbol="NASDAQ:AAPL" />
    </div>

    <!-- Tesla chart -->
    <TradingViewChartWidget symbol="NASDAQ:TSLA" interval="60" />

    <!-- Crypto example -->
    <TradingViewChartWidget symbol="BINANCE:BTCUSDT" theme="light" />
  </div>
</template>

<style scoped></style>
