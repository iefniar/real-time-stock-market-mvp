<script setup lang="ts">
import { FireIcon } from '@heroicons/vue/24/solid'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import successImage from '@/assets/soul-chatgpt-bird-wings-open-no-bg.png'
import errorImage from '@/assets/soul-chatgpt-bird-wings-crossed-no-bg.png'

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

const router = useRouter()
const route = useRoute()
const error = computed(() => route.query.error)
const success = computed(() => !error.value)

const imgSource = computed(() => {
  return success.value ? successImage : errorImage
})

const title = computed(() => {
  switch (error.value) {
    case 'USER_NOT_FOUND':
      return 'Account not found'

    case 'INVALID_TOKEN':
      return 'Invalid verification link'

    case 'TOKEN_EXPIRED':
      return 'Verification link expired'

    default:
      return 'Success!'
  }
})

const message = computed(() => {
  switch (error.value) {
    case 'USER_NOT_FOUND':
      return 'This account no longer exists.'

    case 'INVALID_TOKEN':
      return 'This verification link is invalid.'

    case 'TOKEN_EXPIRED':
      return 'This verification link has expired.'

    default:
      return 'Email verified'
  }
})

const buttonText = computed(() => {
  return success.value ? 'Go to Login Page' : 'Go to Home Page'
})

const handleClick = () => {
  router.push({
    name: success.value ? 'logIn' : 'home'
  })
}

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
          :src="imgSource"
          alt="login image"
          class="w-80 h-80 object-cover hover:drop-shadow-lg/50 drop-shadow-primary transition delay-50 duration-300 ease-in-out"
        />
        <h1
          class="flex gap-1 items-center text-primary text-2xl young-serif-regular hover:drop-shadow-lg/50 drop-shadow-primary transition delay-50 duration-300 ease-in-out"
        >
          <FireIcon class="size-10" />
          {{ title }}
        </h1>
        <p class="text-xl text-secondary mt-4">{{ message }}</p>
        <div class="mt-8">
          <button
            class="btn bg-primary w-full shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125"
            @click="handleClick"
          >
            <span class="text-accent font-normal">{{ buttonText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
