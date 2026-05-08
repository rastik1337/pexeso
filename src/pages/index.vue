<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function gotoConfig() {
  router.push('/config');
}
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center p-16 text-4xl">
    <h1 class="text-6xl">Hello</h1>
    <button class="underline" @click="gotoConfig()">Configure</button>
  </div>
</template>
