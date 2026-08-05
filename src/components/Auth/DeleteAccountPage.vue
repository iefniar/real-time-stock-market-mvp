<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const token = computed(() => String(route.query.token ?? ''))
const loading = ref(false)
const success = ref(false)
const error = ref('')

async function deleteAccount () {
  loading.value = true
  error.value = ''

  if (!token.value) {
    error.value = 'Invalid deletion link.'
    loading.value = false
    return
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/delete-account-by-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          token: token.value
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    success.value = true

    setTimeout(() => {
      router.replace({
        name: 'logIn'
      })
    }, 3000)
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'Unable to delete account.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-3xl font-bold mb-8 text-secondary">Delete account</h1>
    <div v-if="success" class="alert alert-success">
      Your account has been deleted.
    </div>
    <div v-else>
      <p class="text-secondary/75 mb-2">
        Are you sure you want to permanently delete your account?
      </p>
      <p class="text-error text-sm mb-8">This action cannot be undone.</p>
      <button class="btn bg-error w-full text-error-content font-medium shadow-none border-none drop-shadow-lg/50 drop-shadow-error transition duration-300 ease-in-out z-10 hover:brightness-125" :disabled="loading" @click="deleteAccount">
        {{ loading ? 'Deleting...' : 'Delete my account' }}
      </button>
      <div v-if="error" class="alert alert-error mt-6">
        {{ error }}
      </div>
    </div>
  </div>
</template>
