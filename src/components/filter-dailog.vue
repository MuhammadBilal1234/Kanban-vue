<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "@/stores/Tasks";

const taskStore = useTasksStore();

defineProps({
  show: {
    type: Boolean,
  },
});

const emits = defineEmits(["update:dailog"]);

const startDate = ref(new Date());
const endDate = ref(new Date());
const error = ref("");

function submit() {
  if (endDate.value < startDate.value) {
    return (error.value = "End date Must be Greater then Start Date");
  } else {
    error.value = "";
  }

  taskStore.setDateFilter(startDate.value, endDate.value);
  emits("update:dailog", false);
}

function clearFilter() {
  taskStore.resetDateFilter();
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
      <div class="p-5" v-if="error">
        <div class="bg-red-200 p-5 w-full rounded-md flex gap-3 items-center">
          <v-icon icon="mdi-alert-box"></v-icon>
          <p class="text-lg font-semibold flex-1">{{ error }}</p>
        </div>
      </div>
      <main class="p-5 flex items-center justify-between">
        <v-date-picker
          input-mode="keyboard"
          hide-actions
          v-model="startDate"
          title="Start Date"
        ></v-date-picker>
        <v-date-picker
          input-mode="keyboard"
          v-model="endDate"
          hide-actions
          title="End Date"
        ></v-date-picker>
      </main>

      <v-card-actions class="flex py-5 items-center justify-center">
        <v-btn variant="outlined" size="large" @click="clearFilter"
          >Clear</v-btn
        >
        <v-btn variant="outlined" size="large" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
