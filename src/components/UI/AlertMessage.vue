<template>
  <div class="alert-container">
    <div
      role="alert"
      :class="`alert alert-${type} border-neutral border inset-shadow-sm inset-shadow-neutral alert-vertical sm:alert-horizontal drop-shadow-xl/25 drop-shadow-${type}`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="iconPath"
        />
      </svg>
      <span>{{ message }}</span>
      <button
        class="btn bg-primary w-full shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125"
        @click="emit('close')"
      >
        <span class="text-accent font-normal">OK</span>
      </button>
    </div>
  </div>
  <div class="backdrop"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'error' | 'success' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{
    message: string
    type?: AlertType
  }>(),
  {
    type: 'error'
  }
)

const emit = defineEmits<{
  close: []
}>()

const iconPath = computed(() => {
  switch (props.type) {
    case 'success':
      return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'

    case 'warning':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'

    case 'info':
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'

    default:
      return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
})
</script>

<style scoped>
* {
  --left-space-width: 0rem;
  --top-space-height: 4.5rem;
}

@media (width >= 40rem) {
  * {
    --left-space-width: 12rem;
    --top-space-height: 0rem;
  }
}

.alert-container {
  position: fixed;
  top: calc(var(--top-space-height) + 1rem);
  left: calc(var(--left-space-width) + 20%);
  right: 20%;
  z-index: 200;
  max-width: 600px;
  margin-inline: auto;
}

.alert-error {
  background-color: var(--color-error-content);
  color: var(--color-error);

}

.alert-success {
  background-color: var(--color-success-content);
  color: var(--color-success);
}

.alert-warning {
  background-color: var(--color-warning-content);
  color: var(--color-warning);
}

.alert-info {
  background-color: var(--color-info-content);
  color: var(--color-info);
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-error);
    opacity: .1;
    z-index: 100;
}
</style>
