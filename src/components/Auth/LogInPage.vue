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
    <form
      @submit.prevent="onSubmit"
      class="relative space-y-5 max-w-sm mx-auto flex flex-col z-10"
    >
      <div class="flex flex-col items-center">
        <img
          src="@/assets/soul-toucan-no-bg.png"
          alt="login image"
          class="w-64 h-64 object-cover hover:drop-shadow-lg/50 drop-shadow-primary transition delay-50 duration-300 ease-in-out"
        />
        <h1 class="font-light text-secondary text-2xl young-serif-regular">
          Welcome Back
        </h1>
      </div>
      <!-- Email -->
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
        />
        <p class="text-error text-sm pt-1">{{ errors.email }}</p>
      </div>
      <!-- Password -->
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
        />
        <p class="text-error text-sm pt-1">{{ errors.password }}</p>
      </div>
      <!-- Submit -->
      <button
        class="btn bg-primary w-full shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting" class="text-accent font-normal">Log In</span>
        <span
          v-else
          class="flex items-center justify-center gap-2 text-accent font-normal"
        >
          <span class="loading loading-spinner loading-sm"></span>
          Logging in...
        </span>
      </button>
      <div class="flex flex-col items-center pt-4">
        <p class="text-sm text-secondary font-light flex gap-2 items-center">
          Don't have an account?
          <router-link
            class="text-accent transition delay-150 duration-300 ease-in-out hover:text-primary"
            :to="{ name: 'signUp' }"
          >
            Sign Up
          </router-link>
        </p>
      </div>
    </form>
    <AlertMessage
      v-if="showError"
      type="error"
      :message="errorMessage"
      @close="showError = false"
    />
  </div>
</template>

<script setup lang="ts">
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

import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { type LogInFormData } from '@/types/global'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'vue-router'
import AlertMessage from '../UI/AlertMessage.vue'

const router = useRouter()
const showError = ref(false)
const errorMessage = ref('')

// Schema
const schema = toTypedSchema(
  z.object({
    email: z.email('Invalid email'),
    password: z.string().trim().min(6, 'Minimum 6 characters')
  })
)

// Form setup
const defaultValues: LogInFormData = {
  email: '',
  password: ''
}

const { handleSubmit, errors, defineField, isSubmitting, resetForm } =
  useForm<LogInFormData>({
    validationSchema: schema,
    initialValues: defaultValues
  })

// Fields
const [email] = defineField('email')
const [password] = defineField('password')

// Submit
const onSubmit = handleSubmit(async ({ email, password }: LogInFormData) => {
  try {
    const result = await authClient.signIn.email({
      email,
      password
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    resetForm()

    router.push({
      name: 'home'
    })
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Failed to log in'
    showError.value = true
  }
})
</script>
