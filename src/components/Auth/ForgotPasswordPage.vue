<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
const success = ref(false)
const errorMessage = ref('')
const showError = ref(false)

async function forgotPassword () {
  showError.value = false
  loading.value = true

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.value
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    success.value = true
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Something went wrong.'

    showError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-3xl font-bold mb-2 text-secondary">Forgot password</h1>
    <p class="text-secondary/75 mb-8">
      Enter your email address and we'll send you a link to reset your password.
    </p>
    <div v-if="success" class="alert alert-success font-medium">
      If an account exists with that email, we've sent you a password reset
      link.
    </div>
    <form v-else @submit.prevent="forgotPassword" class="space-y-4">
      <input
        v-model="email"
        type="email"
        required
        placeholder="Email address"
        class="input shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
      />
      <button type="submit" class="btn bg-primary w-full text-accent font-normal shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send reset link' }}
      </button>
      <div v-if="showError" class="alert alert-error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
