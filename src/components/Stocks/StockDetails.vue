<template>
  <div class="flex min-h-screen flex-col lg:flex-row gap-4 xl:px-16">
    <div class="lg:w-1/2 flex flex-col gap-4">
      <div class="w-full border border-neutral-content">
        <TradingViewSymbolInfoWidget :symbol="symbol" />
      </div>
      <div class="w-full h-80 lg:h-full border border-neutral-content">
        <TradingViewFundamentalDataWidget :symbol="symbol" />
      </div>
    </div>
    <div class="lg:w-1/2 flex flex-col gap-4">
      <div>
        <TradingViewCompanyProfileWidget :symbol="symbol" />
      </div>
      <div>
        <TradingViewTechnicalAnalysisWidget :symbol="symbol" />
      </div>
      <div class="h-80">
        <TradingViewAdvancedChartWidget :symbol="symbol" />
      </div>
    </div>
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
