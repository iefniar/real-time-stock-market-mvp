<template>
  <div class="absolute inset-0 bg-white dark:bg-gray-950">
    <!-- diagonal pattern -->
    <div
      class="absolute inset-0 opacity-[0.07] dark:opacity-[0.05]"
      :style="patternStyle"
    ></div>

    <!-- gradient overlay -->
    <div
      class="absolute inset-0 bg-linear-to-br from-white via-white/0 to-white dark:from-gray-950 dark:via-gray-950/0 dark:to-gray-950"
    ></div>

  </div>
</template>

<script setup>
const patternStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      -45deg,
      #3b82f6 0px,
      #3b82f6 1px,
      transparent 1px,
      transparent 10px,
      #8b5cf6 10px,
      #8b5cf6 11px,
      transparent 11px,
      transparent 20px,
      #ec4899 20px,
      #ec4899 21px,
      transparent 21px,
      transparent 30px
    )
  `,
  backgroundSize: '42.4px 42.4px'
}
</script>
