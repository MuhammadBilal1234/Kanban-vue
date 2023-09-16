<script setup lang="ts">
import TaskForm from "../form/tasks/TaskForm.vue";

defineProps({
  show: {
    type: Boolean,
  },
});

const emits = defineEmits(["update:dailog"]);

function closeDailog() {
  emits("update:dailog", false);
}
</script>

<template>
  <v-dialog
    :model-value="show"
    @update:model-value="$emit('update:dailog', false)"
    class="max-w-[850px]"
  >
    <v-card>
      <h1
        class="text-center pb-5 scroll-m-20 text-2xl my-5 font-semibold tracking-tight"
      >
        Add New Task
      </h1>
      <TaskForm @action:close-dailog="closeDailog" :edit="false" />
    </v-card>
  </v-dialog>
</template>
