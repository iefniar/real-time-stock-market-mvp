<template>
  <div class="flex min-h-screen p-4 md:p-6 lg:p-8">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <!-- Left column -->
      <div class="flex flex-col gap-6">
        <TradingViewSymbolInfoWidget :symbol="symbol" />

        <TradingViewAdvancedChartWidget :symbol="symbol" />

        <TradingViewAdvancedChartWidget :symbol="symbol" />
      </div>

      <!-- Right column -->
      <div class="flex flex-col gap-6">
        <TradingViewTechnicalAnalysisWidget :symbol="symbol" />

        <TradingViewCompanyProfileWidget :symbol="symbol" />

        <TradingViewFundamentalDataWidget :symbol="symbol" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import TradingViewSymbolInfoWidget from '@/components/TradingView/TradingViewSymbolInfoWidget.vue'
import TradingViewAdvancedChartWidget from '@/components/TradingView/TradingViewAdvancedChartWidget.vue'
import TradingViewTechnicalAnalysisWidget from '@/components/TradingView/TradingViewTechnicalAnalysisWidget.vue'
import TradingViewCompanyProfileWidget from '@/components/TradingView/TradingViewCompanyProfileWidget.vue'
import TradingViewFundamentalDataWidget from '@/components/TradingView/TradingViewFundamentalDataWidget.vue'

interface Props {
  symbol: string
}

defineProps<Props>()
</script>
