<script setup lang="ts"></script>

<template>
  <main
    class="w-full min-w-[300px] bg-red-300 h-full max-h-[90vh] overflow-auto border rounded-md shadow-sm"
  >
    <h4
      className="scroll-m-20 text-xl text-center py-3 font-semibold tracking-tight"
    >
      Pending (1/2) 50%
    </h4>
    <main class="w-full flex items-center flex-col gap-2">
      <div class="w-[90%] mx-auto h-[330px] bg-blue-400 overflow-auto">
        <div
          class="div bg-orange-300 py-3 px-2 font-semibold flex justify-between"
        >
          <p class="scroll-m-20 text-xl font-semibold tracking-tight">Task</p>
          <div class="flex items-center justify-center space-x-4 min-w-[50px]">
            <v-icon size="large" icon="mdi-pencil"></v-icon>
            <v-icon size="large" icon="mdi-delete-outline"></v-icon>
          </div>
        </div>
        <div class="p-4">
          <p>Task : Task</p>
          <p>
            Description: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Vel quia sit rem, maxime hic beatae. Impedit iusto eaque
            possimus inventore.
          </p>
          <p>Task : Task</p>
          <p>
            Description: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Vel quia sit rem, maxime hic beatae. Impedit iusto eaque
            possimus inventore.
          </p>
          <p>Task : Task</p>
        </div>
      </div>
      <div class="w-[90%] mx-auto h-[250px] bg-blue-400"></div>
    </main>
  </main>
</template>
