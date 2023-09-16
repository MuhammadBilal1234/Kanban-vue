<script setup lang="ts">
import { ref, watch } from "vue";
import TaskForm from "../form/tasks/TaskForm.vue";
import { useRoute, useRouter } from "vue-router";
import { useTasksStore } from "@/stores/Tasks";

const route = useRoute();
const router = useRouter();
const showModal = ref<Boolean>(false);

const taskStore = useTasksStore();

const task = taskStore.tasks.find((i) => i.id == route.params.taskid);

watch(
  () => route.meta,
  (newVal) => {
    if (newVal && newVal.showModal) {
      showModal.value = !!newVal.showModal;
    }
  },
  { deep: true, immediate: true }
);

function closeDailog() {
  showModal.value = false;
  router.push("/");
}
</script>

<template>
  <v-dialog
    :model-value="showModal"
    @update:model-value="closeDailog"
    class="max-w-[850px]"
  >
    <v-card>
      <h1
        class="text-center pb-5 scroll-m-20 text-2xl my-5 font-semibold tracking-tight"
      >
        Edit Task
      </h1>
      <TaskForm
        @action:close-dailog="closeDailog"
        :edit="true"
        :task="task"
        v-if="task"
      />
    </v-card>
  </v-dialog>
</template>
