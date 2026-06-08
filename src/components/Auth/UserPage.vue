<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authClient } from "@/lib/auth-client";
import { type User } from '@/types/global';

const router = useRouter();

const user = ref<User | null>(null);

onMounted(async () => {
  const session = await authClient.getSession();

  if (!session?.data?.user) {
    router.push({ name: "logIn" });
    return;
  }

  user.value = {
    id: session.data.user.id,
    name: session.data.user.name,
    email: session.data.user.email,
  };
});
</script>

<template>
  <div v-if="user">
    <h1>User Profile</h1>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>
