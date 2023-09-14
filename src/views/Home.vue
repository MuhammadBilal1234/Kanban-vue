<script setup lang="ts">
import ProgressBar from "@/components/progress-bar.vue";
import Board from "@/components/board.vue";
</script>

<template>
  <main class="mx-auto max-w-7xl min-h-screen">
    <ProgressBar />

    <section class="flex justify-end items-center space-x-3 my-8">
      <v-btn variant="outlined" prepend-icon="mdi-feature-search-outline">
        Search & Filter
      </v-btn>
      <v-btn prepend-icon="mdi-plus" variant="outlined"> Add Task </v-btn>
    </section>

    <section class="grid gap-4 grid-cols-1 md:grid-cols-3">
      <template v-for="i in 3">
        <Board />
      </template>
    </section>
  </main>
</template>
