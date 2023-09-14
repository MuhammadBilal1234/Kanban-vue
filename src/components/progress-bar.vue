<script setup lang="ts">
import { ref } from "vue";

const power = ref(20);
setInterval(() => {
  power.value++;
}, 1000);
</script>

<template>
  <div class="border py-4 px-3 shadow-sm mt-5">
    <h3
      class="text-center scroll-m-20 text-2xl font-semibold tracking-tight py-5"
    >
      Progress
    </h3>
    <v-progress-linear
      v-model="power"
      color="amber"
      height="30"
      class="rounded-md"
    >
      <strong>{{ Math.ceil(power) }}%</strong>
    </v-progress-linear>
  </div>
</template>
