<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    <h1>🎉 Account created!</h1>

    <p>
      Welcome, <strong>{{ name }}</strong
      >!
    </p>

    <p>We've sent a verification email to:</p>

    <p>
      <strong>{{ email }}</strong>
    </p>

    <p>Please click the link in that email to activate your account.</p>
  </div>
</template>
