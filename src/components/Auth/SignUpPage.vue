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

  <form
    @submit.prevent="onSubmit"
    class="space-y-5 max-w-sm mx-auto flex flex-col z-10"
  >
    <!-- Full Name -->
    <div>
      <input
        v-model="fullName"
        type="text"
        placeholder="Full Name"
        class="input bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
      />
      <p class="text-error text-sm">{{ errors.fullName }}</p>
    </div>
    <!-- Email -->
    <div>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="input bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
      />
      <p class="text-error text-sm">{{ errors.email }}</p>
    </div>
    <!-- Password -->
    <div>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
      />
      <p class="text-error text-sm">{{ errors.password }}</p>
    </div>
    <!-- Country -->
    <div>
      <input
        v-model="country"
        type="text"
        placeholder="Country"
        class="input bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
      />
      <p class="text-error text-sm">{{ errors.country }}</p>
    </div>
    <!-- Investment Goals -->
    <div>
      <select
        v-model="investmentGoals"
        class="select bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
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
      <p class="text-error text-sm">{{ errors.investmentGoals }}</p>
    </div>
    <!-- Risk Tolerance -->
    <div>
      <select
        v-model="riskTolerance"
        class="select bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
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
      <p class="text-error text-sm">{{ errors.riskTolerance }}</p>
    </div>
    <!-- Preferred Industry -->
    <div>
      <select
        v-model="preferredIndustry"
        class="select bg-secondary-content w-full focus-within:outline-0 focus-within:border-primary"
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
      <p class="text-error text-sm">{{ errors.preferredIndustry }}</p>
    </div>
    <!-- Submit -->
    <button class="btn bg-primary w-full" :disabled="isSubmitting">
      <span v-if="!isSubmitting" class="text-accent">Create Account</span>
      <span v-else class="flex items-center justify-center gap-2 text-accent">
        <span class="loading loading-spinner loading-sm"></span>
        Creating...
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
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

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import {
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
  type SignUpFormData
} from '@/types/forms'

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
  country: 'USA',
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
const onSubmit = handleSubmit(async values => {
  try {
    // simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Submitted:', values)

    // reset all fields
    resetForm()
    alert('Account created successfully!')
  } catch (error) {
    console.error(error)
  }
})
</script>
