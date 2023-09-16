<script setup lang="ts">
import { ref } from "vue";
import ProgressBar from "@/components/progress-bar.vue";
import Board from "@/components/board.vue";
import AddTaskDailog from "@/components/tasks/add-task-dailog.vue";
import FilterDailog from "@/components/filter-dailog.vue";
import { useTasksStore } from "@/stores/Tasks";

const taskStore = useTasksStore();

const showTaskDailog = ref(false);
const showFilterDailog = ref(false);
const uniqueKey = ref(0);

function closeTaskDailog(value) {
  showTaskDailog.value = value;
  uniqueKey.value++;
}

function closeFilterDailog(value) {
  showFilterDailog.value = value;
  uniqueKey.value++;
}
</script>

<template>
  <main class="mx-auto max-w-7xl min-h-screen">
    <ProgressBar />

    <section
      class="flex flex-col md:flex-row justify-between items-center space-x-3 my-8"
    >
      <div class="flex-1 w-full">
        <v-text-field
          label="Search"
          variant="outlined"
          v-model="taskStore.search"
          class="w-full sm:w-1/2"
        ></v-text-field>
      </div>

      <div class="flex space-x-3">
        <div
          class="flex space-x-2 items-center"
          v-if="taskStore.startDate && taskStore.endDate"
        >
          <v-chip>
            {{ taskStore.startDate.toISOString().split("T")[0] }}
          </v-chip>
          <p class="flex items-center">To</p>
          <v-chip>
            {{ taskStore.endDate.toISOString().split("T")[0] }}
          </v-chip>
        </div>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-feature-search-outline"
          @click="showFilterDailog = true"
        >
          Search & Filter
        </v-btn>
        <v-btn
          prepend-icon="mdi-plus"
          variant="outlined"
          @click="showTaskDailog = true"
        >
          Add Task
        </v-btn>
      </div>
    </section>

    <section class="grid gap-4 grid-cols-1 md:grid-cols-3 my-5">
      <Board
        :tasks="taskStore.pendingTasks"
        :board-progress="taskStore.pendingBoardStatus"
        status="Pending"
      />
      <Board
        :tasks="taskStore.processingTasks"
        :board-progress="taskStore.processingBoardStatus"
        status="Processing"
      />
      <Board
        :tasks="taskStore.doneTasks"
        :board-progress="taskStore.doneBoardStatus"
        status="Done"
      />
    </section>
    <AddTaskDailog
      :show="showTaskDailog"
      @update:dailog="closeTaskDailog"
      :id="uniqueKey"
    />

    <FilterDailog
      :show="showFilterDailog"
      @update:dailog="closeFilterDailog"
      :id="uniqueKey"
    />
    <router-view></router-view>
  </main>
</template>
@/stores/Tasks
