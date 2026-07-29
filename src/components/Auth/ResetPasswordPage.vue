<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { type ResetPasswordFormData } from '@/types/global'

const route = useRoute()
const router = useRouter()
const token = computed(() => String(route.query.token ?? ''))
const success = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const schema = toTypedSchema(
  z
    .object({
      password: z.string().trim().min(6, 'Minimum 6 characters').max(128, 'Maximum 128 characters'),

      confirmPassword: z.string().trim().min(6, 'Minimum 6 characters').max(128, 'Maximum 128 characters')
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })
)

const defaultValues: ResetPasswordFormData = {
  password: '',
  confirmPassword: ''
}

const { handleSubmit, defineField, errors, isSubmitting, resetForm } =
  useForm<ResetPasswordFormData>({
    validationSchema: schema,
    initialValues: defaultValues
  })

const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')

const resetPassword = handleSubmit(async ({ password }) => {
  showError.value = false

  if (!token.value) {
    errorMessage.value = 'Invalid or expired password reset link.'
    showError.value = true
    return
  }

  try {
    const { error } = await authClient.resetPassword({
      token: token.value,
      newPassword: password
    })

    if (error) {
      if (error.code === 'INVALID_TOKEN') {
        throw new Error('This password reset link is invalid or has expired.')
      }

      throw new Error(error.message)
    }

    showError.value = false
    errorMessage.value = ''
    success.value = true

    resetForm()

    setTimeout(() => {
      router.replace({
        name: 'logIn'
      })
    }, 2500)
  } catch (err) {
    errorMessage.value =
      err instanceof Error ? err.message : 'Failed to reset password.'

    showError.value = true
  }
})

onMounted(() => {
  if (!token.value) {
    router.replace({
      name: 'logIn'
    })
  }
})
</script>

<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-3xl font-bold mb-2 text-secondary">Create a new password</h1>
    <p class="text-secondary/75 mb-8">Type a new password for your account.</p>
    <div v-if="success" class="alert alert-success">
      Password updated successfully. Redirecting to login...
    </div>
    <form v-else class="space-y-4" @submit.prevent="resetPassword">
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="New password"
          required
          autocomplete="new-password"
          :disabled="isSubmitting"
          class="input shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
        />
        <p class="text-error text-sm pt-1">
          {{ errors.password }}
        </p>
      </div>
      <div>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
          autocomplete="new-password"
          :disabled="isSubmitting"
          class="input shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
        />
        <p class="text-error text-sm pt-1">
          {{ errors.confirmPassword }}
        </p>
      </div>
      <button
        type="submit"
        class="btn bg-primary w-full text-accent font-normal shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Updating...' : 'Reset password' }}
      </button>
      <div v-if="showError" class="alert alert-error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
