<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BellAlertIcon } from '@heroicons/vue/24/solid'

const patternStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      -45deg,

      #3b82f6 0px,
      #3b82f6 1px,
      rgba(59,130,246,0) 1px,
      rgba(59,130,246,0) 10px,

      #8b5cf6 10px,
      #8b5cf6 11px,
      rgba(139,92,246,0) 11px,
      rgba(139,92,246,0) 20px,

      #ec4899 20px,
      #ec4899 21px,
      rgba(236,72,153,0) 21px,
      rgba(236,72,153,0) 30px
    )
  `,
  backgroundSize: '42.4px 42.4px'
}

const route = useRoute()
const router = useRouter()

const email = computed(() => String(route.query.email ?? ''))
const name = computed(() => String(route.query.name ?? ''))

onMounted(() => {
  if (!email.value) {
    router.replace({ name: 'signUp' })
  }
})
</script>

<template>
  <div>
    <div class="absolute inset-0 bg-primary-content dark:bg-gray-950">
      <!-- diagonal pattern -->
      <div
        class="absolute inset-0 opacity-[0.07] dark:opacity-[0.05]"
        :style="patternStyle"
      ></div>
      <!-- gradient overlay -->
      <div
        class="absolute inset-0 bg-linear-to-br from-primary-content via-white/0 to-bg-gray-950 dark:from-gray-950 dark:via-gray-950/0 dark:to-gray-950"
      ></div>
    </div>
    <div class="relative">
      <div class="flex flex-col items-center text-secondary/75">
        <img
          src="@/assets/soul-chatgpt-bird-wings-crossed-no-bg.png"
          alt="login image"
          class="w-80 h-80 object-cover hover:drop-shadow-lg/50 drop-shadow-primary transition delay-50 duration-300 ease-in-out"
        />
        <h1 class="flex gap-1 items-center font-light text-primary text-2xl young-serif-regular hover:drop-shadow-lg/50 drop-shadow-primary transition delay-50 duration-300 ease-in-out">
          <BellAlertIcon class="size-10" />
          Account created!
        </h1>
        <p class="text-xl text-secondary mt-4">
          Welcome, <strong>{{ name }}</strong>
        </p>
        <p class="mt-4">We've sent a verification email to:</p>
        <p>
          <strong class="text-primary">{{ email }}</strong>
        </p>
        <p class="text-xs mt-4 text-center">Click the link in the email to activate your account</p>
        <p class="text-xs mt-4 text-center">Don't see the email? Please check in your spam folder</p>
      </div>
    </div>
  </div>
</template>
