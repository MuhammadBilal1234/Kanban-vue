<script setup lang="ts">
import { ref } from "vue";
import TaskCard from "./tasks/task-card.vue";
import draggable from "vuedraggable";
import { useTasksStore } from "@/stores/Tasks";

const taskStore = useTasksStore();

const props = defineProps({
  tasks: {
    type: Array,
  },

  boardProgress: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    required: true,
  },
});

const drag = ref(false);

function updateTaskList(list) {
  console.log({ list });

  if (list.moved) {
    const { newIndex, oldIndex, element } = list.moved;

    const newList = [...taskStore.tasks].filter((i) => i.id !== element.id);

    taskStore.tasks = newList;
    taskStore.tasks.splice(newIndex, 0, element);

    taskStore.tasks.forEach((task, index) => {
      task.sortOrder = index;
    });
  } else if (list.added) {
    const { element } = list.added;

    taskStore.tasks.forEach((tk) => {
      // @ts-ignore
      if (tk.id == element.id) tk.status = props.status;
    });
  }
  console.log(taskStore.tasks);
}

function itemKeys(item) {
  return item.id;
}
</script>

<template>
  <main
    class="w-full min-w-[300px] h-full max-h-[90vh] min-h-[300px] overflow-auto border rounded-md shadow-sm mb-5"
  >
    <h4
      className="scroll-m-20 text-xl text-center py-3 font-semibold tracking-tight"
    >
      {{ boardProgress }}
    </h4>
    <main class="w-full flex items-center flex-col gap-2 mb-5">
      <p
        v-if="tasks.length === 0"
        class="text-center scroll-m-20 text-xl font-semibold tracking-tight border-b w-full pb-5"
      >
        No Task Here
      </p>
      <draggable
        @start="drag = true"
        @end="drag = false"
        :modelValue="tasks"
        :group="{ name: 'people' }"
        :itemKey="(key) => itemKeys(key)"
        @change="(list) => updateTaskList(list)"
        class="min-h-[120px] w-full"
      >
        <template #item="{ element }">
          <TaskCard :task="element" :key="element.id" class="my-4" />
        </template>
      </draggable>
    </main>
  </main>
</template>
