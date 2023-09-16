<script setup lang="ts">
import { toRef, watch, ref } from "vue";

const props = defineProps({
  file: {
    type: File,
  },
  label: {
    type: String,
    default: "Attachment",
  },
});

const emits = defineEmits(["update:file"]);

const files = ref();
const url = ref();

watch(files, (newVal, _) => {
  emits("update:file", newVal);
  if (newVal[0]) {
    url.value = URL.createObjectURL(newVal[0]);
  } else {
    url.value = null;
  }
});

watch(
  () => props.file,
  (newVal, _) => {
    console.log({ newVal });
    if (newVal?.name) {
      files.value = [newVal];
      url.value = URL.createObjectURL(newVal);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="my-5"><img v-if="url" :src="url" class="w-full" /></div>
  <v-file-input
    :label="label"
    variant="outlined"
    v-model="files"
  ></v-file-input>
</template>
