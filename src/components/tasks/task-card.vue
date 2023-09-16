<script setup lang="ts">
import { useTasksStore } from "@/stores/Tasks";
import { ref , watch } from "vue";

const taskStore = useTasksStore();
const url = ref(null)

const props = defineProps({
  task: {
    type: Object,
  },
});


watch(() => props.task , (newVal , _) => {
    console.log(newVal)
  if(newVal?.files?.name) {
    url.value = URL.createObjectURL(newVal.files)
  }
}, {immediate : true , deep : true})



</script>

<template>
  <div
    class="w-[90%] mx-auto h-full min-h-[100px] bg-blue-400 overflow-auto rounded-md"
  >
    <div class="div bg-orange-300 py-3 px-2 font-semibold flex justify-between">
      <p class="scroll-m-20 text-xl font-semibold tracking-tight">Task</p>
      <div class="flex items-center justify-center space-x-4 min-w-[50px]">
        <v-icon size="large" icon="mdi-pencil" class="cursor-pointer" @click="$router.push(`/${task.id}`)"></v-icon>
        <v-icon
          size="large"
          icon="mdi-delete-outline"
          class="cursor-pointer"
          @click="taskStore.deleteTask(task.id)"
        ></v-icon>
      </div>
    </div>
    <div class="p-4 w-full">

      <div class="my-5 w-full"><img v-if="url" class="w-full" :src="url" /></div>



      <p class="font-semibold text-lg">Task :</p>
      <p>{{ task?.title ?? "" }}</p>
      
      
      <p class="w-full">
        <span class="font-semibold text-lg">Description : </span>
        <p class="w-3/4 whitespace-nowrap overflow-hidden text-ellipsis">{{
          task?.description ?? ""
        }}</p>
      </p>

      <p class="w-full" v-if="task?.comments?.length > 0">
        <span class="font-semibold text-lg">Comments : </span>
        <p class="w-3/4 whitespace-nowrap overflow-hidden text-ellipsis" v-for="cm in task.comments">
        {{ cm }}
        </p>
      </p>
      
      <p class="font-semibold text-lg">Labels : </p>
      <template v-for="tag in task?.tags" class="mt-2" >

        <v-chip class="mr-1">
          {{ tag }}
        </v-chip>
      </template>
      <!-- <p><span class="font-semibold text-lg">Estimated Date :</span>  {{ task?.estimated_date ?? "" }}</p> -->
    </div>
  </div>
</template>
