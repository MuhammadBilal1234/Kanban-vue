<script setup lang="ts">
import { useTasksStore } from "@/stores/Tasks";

const taskStore = useTasksStore();
</script>

<template>
  <div class="border py-4 px-3 shadow-sm mt-5">
    <h3
      class="text-center scroll-m-20 text-2xl font-semibold tracking-tight py-5"
    >
      Progress
    </h3>
    <v-progress-linear
      :model-value="taskStore.progressBarPercentage"
      color="success"
      height="30"
      class="rounded-md"
    >
      <strong class="text-white">{{ taskStore.progressBarStatus }}</strong>
    </v-progress-linear>
  </div>
</template>
