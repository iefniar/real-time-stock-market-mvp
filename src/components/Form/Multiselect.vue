<script setup lang="ts">
import { computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import countries from 'world-countries'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const countryOptions = computed(() =>
  countries
    .map(country => ({
      value: country.name.common,
      label: country.name.common
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
)
</script>

<template>
  <Multiselect
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event ?? '')"
    :options="countryOptions"
    placeholder="Select country"
    :searchable="true"
    :close-on-select="true"
    :can-clear="false"
    class="w-full multiselect-class"
  />
</template>

<style>
.multiselect-class {
  color: var(--color-primary);
  --ms-font-size: 0.9rem;
  --ms-option-font-size: 0.9rem;
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
  --ms-dropdown-border-color: var(--color-primary);
  --ms-radius: 5px;
}

.multiselect-class:focus-within {
  --ms-border-color: var(--color-primary);
}

.multiselect.is-open {
  border-radius: var(--ms-radius);
}

.multiselect-dropdown {
  padding-block: 0.3rem;
  --ms-max-height: 158px;
}

.multiselect-option {
  border-radius: 4px;
  margin: 0.1rem 0.3rem;
}
</style>
