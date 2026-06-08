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
        <UserCircleIcon
          class="size-20 text-primary drop-shadow-lg/50 drop-shadow-primary"
        />
        <h1 class="font-light text-secondary">Sign Up</h1>
      </div>
      <!-- Full Name -->
      <div>
        <input
          v-model="fullName"
          type="text"
          placeholder="Full Name"
          class="input shadow-none bg-secondary-content text-primary w-full focus-within:outline-0 focus-within:border-primary"
        />
        <p class="text-error text-sm pt-1">{{ errors.fullName }}</p>
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
      <!-- Country -->
      <div>
        <Multiselect v-model="country" />
        <p class="text-error text-sm pt-1">
          {{ errors.country }}
        </p>
      </div>
      <!-- Investment Goals -->
      <div>
        <select
          v-model="investmentGoals"
          class="select shadow-none text-primary w-full focus-within:outline-0 focus-within:border-primary"
        >
          <option disabled value="">Investment Goals</option>
          <option
            v-for="option in INVESTMENT_GOALS"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <p class="text-error text-sm pt-1">{{ errors.investmentGoals }}</p>
      </div>
      <!-- Risk Tolerance -->
      <div>
        <select
          v-model="riskTolerance"
          class="select shadow-none text-primary w-full focus-within:outline-0 focus-within:border-primary"
        >
          <option disabled value="">Risk Tolerance</option>
          <option
            v-for="option in RISK_TOLERANCE_OPTIONS"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <p class="text-error text-sm pt-1">{{ errors.riskTolerance }}</p>
      </div>
      <!-- Preferred Industry -->
      <div>
        <select
          v-model="preferredIndustry"
          class="select shadow-none text-primary w-full focus-within:outline-0 focus-within:border-primary"
        >
          <option disabled value="">Preferred Industry</option>
          <option
            v-for="option in PREFERRED_INDUSTRIES"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <p class="text-error text-sm pt-1">{{ errors.preferredIndustry }}</p>
      </div>
      <!-- Submit -->
      <button
        class="btn bg-primary w-full shadow-none border-none drop-shadow-lg/50 drop-shadow-primary transition duration-300 ease-in-out z-10 hover:brightness-125"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting" class="text-accent font-normal"
          >Create Account</span
        >
        <span
          v-else
          class="flex items-center justify-center gap-2 text-accent font-normal"
        >
          <span class="loading loading-spinner loading-sm"></span>
          Creating...
        </span>
      </button>
      <div class="flex flex-col items-center pt-4">
        <p class="text-sm text-secondary font-light flex gap-2 items-center">
          Already have an account?
          <router-link
            class="text-accent transition delay-150 duration-300 ease-in-out hover:text-primary"
            :to="{ name: 'logIn' }"
          >
            Log In
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
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import {
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
  type SignUpFormData
} from '@/types/global.ts'
import Multiselect from '../Form/Multiselect.vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import AlertMessage from '../UI/AlertMessage.vue'

const router = useRouter()
const showError = ref(false)
const errorMessage = ref('')

// Schema
const schema = toTypedSchema(
  z.object({
    fullName: z.string().trim().min(1, 'Full name is required'),
    email: z.email('Invalid email'),
    password: z.string().trim().min(6, 'Minimum 6 characters'),
    country: z.string().trim().min(2, 'Country is required'),
    investmentGoals: z.string().trim().min(1, 'Select a goal'),
    riskTolerance: z.string().trim().min(1, 'Select risk level'),
    preferredIndustry: z.string().trim().min(2, 'Required')
  })
)

// Form setup
const defaultValues: SignUpFormData = {
  fullName: '',
  email: '',
  password: '',
  country: '',
  investmentGoals: '',
  riskTolerance: '',
  preferredIndustry: ''
}

const { handleSubmit, errors, defineField, isSubmitting, resetForm } =
  useForm<SignUpFormData>({
    validationSchema: schema,
    initialValues: defaultValues
  })

// Fields
const [fullName] = defineField('fullName')
const [email] = defineField('email')
const [password] = defineField('password')
const [country] = defineField('country')
const [investmentGoals] = defineField('investmentGoals')
const [riskTolerance] = defineField('riskTolerance')
const [preferredIndustry] = defineField('preferredIndustry')

// Submit
const onSubmit = handleSubmit(
  async ({
    email,
    password,
    fullName,
    country,
    investmentGoals,
    riskTolerance,
    preferredIndustry
  }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/sign-up`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
            fullName,
            country,
            investmentGoals,
            riskTolerance,
            preferredIndustry
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.log(data)
        throw new Error(`Request failed: ${data.error}`)
      }

      console.log('Submitted:', data)

      resetForm()

      await router.replace({
        name: 'home'
      })
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : 'Something went wrong'

      showError.value = true
    }
  }
)
</script>

<style scoped>
select {
  background: var(--color-secondary-content);
}
</style>
