<template>
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
    <div
      class="relative flex flex-col items-center justify-center my-auto mx-auto"
    >
      <img
        src="@/assets/soul-turtle-no-bg.png"
        alt="login image"
        class="w-96 h-96 object-cover hover:drop-shadow-lg/50 drop-shadow-error transition delay-50 duration-300 ease-in-out"
      />
      <h1
        class="absolute bottom-30 font-light text-error text-3xl young-serif-regular"
      >
        404
      </h1>
      <h1
        class="absolute top-60 font-light text-error text-6xl young-serif-regular"
      >
        OOPS!
      </h1>
      <h1 class="font-light text-error text-xl young-serif-regular">
        Page Not Found
      </h1>
      <button
        class="btn bg-primary mt-4 px-16 shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125"
        @click="handleClick"
      >
        <span class="text-accent font-normal">Go Home</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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

const handleClick = () => {
  router.push({
    name: 'home'
  })
}
</script>
