<script setup lang="ts">
import { ref, computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import countries from 'world-countries'

const selectedCountry = ref('')

const countryOptions = computed(() =>
  countries
    .map(country => ({
      value: country.cca2,
      label: country.name.common
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
)
</script>

<template>
  <Multiselect
    v-model="selectedCountry"
    :options="countryOptions"
    placeholder="Select country"
    :searchable="true"
    :close-on-select="true"
    :can-clear="false"
    class="w-full"
  />
</template>

<style scoped>
.multiselect-class {
  color: var(--color-primary);
  font-size: .9rem;
  --ms-option-font-size: .9rem;
  --ms-bg: var(--color-secondary-content);
  --ms-border-color: var(--color-secondary-content);
  --ms-ring-width: 0;
  --ms-option-bg-selected: var(--color-primary);
  --ms-option-bg-pointed: var(--color-neutral);
  --ms-option-bg-selected-pointed: var(--color-primary);
  --ms-option-color-selected: var(--color-secondary);
  --ms-option-color-pointed: var(--color-secondary);
  --ms-color: var(--color-primary);
  --ms-placeholder-color: var(--color-primary);
  --ms-dropdown-bg: var(--color-secondary-content);
  --ms-caret-color: var(--color-primary);
}

.multiselect-class:focus-within {
  --ms-border-color: var(--color-primary);
}

</style>
