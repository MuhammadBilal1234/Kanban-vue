import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { Task } from "@/types/task";
import { matchSorter } from "match-sorter";
import { filterByDateRange, findBoardProgressInPercentage } from "@/utils";

export const useTasksStore = defineStore("tasks", () => {
  // State
  const tasks = ref<Array<Task>>([]);
  const search = ref("");
  const startDate = ref<Date | null>(null);
  const endDate = ref<Date | null>(null);

  // watch

  if (localStorage.getItem("tasks")) {
    tasks.value = JSON.parse(localStorage.getItem("tasks") ?? "");
  }
  watch(
    tasks,
    (tasksVal) => {
      localStorage.setItem("tasks", JSON.stringify(tasksVal));
    },
    { deep: true }
  );

  // Getters

  const pendingTasks = computed(() => {
    let tasksDateFiltered = tasks.value;
    if (startDate.value && endDate.value) {
      tasksDateFiltered = filterByDateRange(
        tasks.value,
        startDate.value,
        endDate.value
      );
    }

    const filteredTasks = matchSorter(tasksDateFiltered, search.value, {
      keys: ["title", "description", "tags"],
    });

    const temp = filteredTasks
      .filter((t) => t.status == "Pending")
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return temp;
  });

  const doneTasks = computed(() => {
    let tasksDateFiltered = tasks.value;
    if (startDate.value && endDate.value) {
      tasksDateFiltered = filterByDateRange(
        tasks.value,
        startDate.value,
        endDate.value
      );
    }
    const filteredTasks = matchSorter(tasksDateFiltered, search.value, {
      keys: ["title", "description", "tags"],
    });
    return filteredTasks
      .filter((t) => t.status == "Done")
      .sort((a, b) => a.sortOrder - b.sortOrder);
  });

  const processingTasks = computed(() => {
    let tasksDateFiltered = tasks.value;
    if (startDate.value && endDate.value) {
      tasksDateFiltered = filterByDateRange(
        tasks.value,
        startDate.value,
        endDate.value
      );
    }

    const filteredTasks = matchSorter(tasksDateFiltered, search.value, {
      keys: ["title", "description", "tags"],
    });
    return filteredTasks
      .filter((t) => t.status == "Processing")
      .sort((a, b) => a.sortOrder - b.sortOrder);
  });

  const pendingBoardStatus = computed(
    () =>
      `Pending (${pendingTasks.value.length}/${
        tasks.value.length
      }) (${findBoardProgressInPercentage(
        pendingTasks.value.length,
        tasks.value.length
      )}%)`
  );

  const doneBoardStatus = computed(
    () =>
      `Done (${doneTasks.value.length}/${
        tasks.value.length
      }) (${findBoardProgressInPercentage(
        doneTasks.value.length,
        tasks.value.length
      )}%)`
  );
  const processingBoardStatus = computed(
    () =>
      `Processing (${processingTasks.value.length}/${
        tasks.value.length
      }) (${findBoardProgressInPercentage(
        processingTasks.value.length,
        tasks.value.length
      )}%)`
  );

  const progressBarStatus = computed(
    () =>
      `${findBoardProgressInPercentage(
        doneTasks.value.length,
        tasks.value.length
      )}% (Done ${doneTasks.value.length} out of ${tasks.value.length})`
  );

  const progressBarPercentage = computed(() => {
    return findBoardProgressInPercentage(
      doneTasks.value.length,
      tasks.value.length
    );
  });

  // Actions

  function newTask(task: Task) {
    tasks.value.push(task);
    resetDateFilter();
    search.value = "";
  }

  function editTask(payload: Task, oldTask: Task) {
    const newTasks = [...tasks.value].map((tk) => {
      if (tk.id == oldTask.id) {
        return {
          ...payload,
          comments: [...tk?.comments, payload.comments],
          id: oldTask.id,
        };
      } else return tk;
    });
    //@ts-ignore
    tasks.value = newTasks;
  }

  function deleteTask(id: string) {
    tasks.value = [...tasks.value].filter((tk) => tk.id !== id);
  }

  function resetDateFilter() {
    startDate.value = null;
    endDate.value = null;
  }

  function setDateFilter(startDatefilter: Date, endDatefilter: Date) {
    startDate.value = startDatefilter;
    endDate.value = endDatefilter;
  }

  return {
    tasks,
    search,
    pendingTasks,
    doneTasks,
    processingTasks,
    pendingBoardStatus,
    doneBoardStatus,
    processingBoardStatus,
    newTask,
    deleteTask,
    resetDateFilter,
    setDateFilter,
    editTask,
    progressBarStatus,
    progressBarPercentage,
    startDate,
    endDate,
  };
});
