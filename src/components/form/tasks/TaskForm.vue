<script setup lang="ts">
import TextField from "../TextField.vue";
import TextArea from "../TextArea.vue";
import FileInput from "../FileInput.vue";
import DatePicker from "../DatePicker.vue";
import Select from "../Select.vue";
import ComboBox from "../ComboBox.vue";
import { ref } from "vue";
import { useForm, Form } from "vee-validate";
import { STATUS, TAGS } from "../../../constants/status";
import { generateUniqueId } from "../../../utils";
import { useTasksStore } from "../../../stores/Tasks";
import { ValidationSchema } from "../../../utils/schemas/TasksFormValidation";
import type { Task } from "@/types/task";

const taskStore = useTasksStore();

const props = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object,
  },
});

const emits = defineEmits(["action:close-dailog"]);

console.log(props.task);

const { handleSubmit, errors, handleReset, resetForm } = useForm({
  validationSchema: ValidationSchema,
  initialValues: {
    title: props.edit ? props.task.title : "asd",
    description: props.edit ? props.task.description : "",
    estimated_date: props.edit ? props.task.estimated_date : new Date(),
    status: props.edit ? props.task.status : STATUS[0],
    tags: props.edit ? props.task.tags : [],
    comment: "",
  },
});

const file = ref([]);

function updateFile(val) {
  if ([...val].length == 0) {
    file.value = [];
  }

  [...val].forEach((f: any) => {
    file.value = f;
  });
}

const onSubmit = handleSubmit((values) => {
  console.log(values, file);

  const payload: any = {
    id: generateUniqueId(),
    ...values,
    files: file.value,
    comments: props.edit ? values.comment : [],
  };

  if (payload.comment) delete payload.comment;

  //@ts-ignore
  props.edit
    ? taskStore.editTask(payload, props.task)
    : taskStore.newTask(payload);

  emits("action:close-dailog");
});

const FormBuilder = [
  {
    props: {
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Title",
      disabled: false,
      required: true,
      value: props.edit ? props.task.title : "",
    },
    component: TextField,
    display: true,
  },
  {
    props: {
      name: "description",
      type: "text",
      label: "Description",
      placeholder: "Description",
      disabled: false,
      required: true,
      value: props.edit ? props.task.description : "",
    },
    component: TextArea,
    display: true,
  },
  {
    props: {
      name: "comment",
      type: "text",
      label: "Comments",
      placeholder: "Comments",
      disabled: false,
      required: true,
      value: "",
    },
    component: TextArea,
    display: props.edit,
  },
  {
    props: {
      name: "status",
      type: "text",
      label: "Status",
      placeholder: "Status",
      disabled: false,
      required: true,
      selectOptions: STATUS,
      value: props.edit ? props.task.status : STATUS[0],
    },
    component: Select,
    display: true,
  },
  {
    props: {
      name: "tags",
      type: "text",
      label: "Tags",
      placeholder: "Tags",
      disabled: false,
      required: true,
      multiple: true,
      selectOptions: TAGS,
      value: props.edit ? props.task.tags : [],
    },
    component: ComboBox,
    display: true,
  },
];

const DatePickerFormBuilder = [
  {
    props: {
      name: "estimated_date",
      type: "text",
      label: "Estimated Date",
      placeholder: "Estimated Date",
      disabled: false,
      required: true,
      // value: new Date(),
      value: props.edit ? new Date(props.task.estimated_date) : new Date(),
    },
    component: DatePicker,
    display: true,
  },
];
</script>

<template>
  <form class="form" @submit="onSubmit" @reset="handleReset">
    <v-card-text>
      <div class="flex gap-4 flex-col sm:flex-row">
        <main class="flex-1">
          <template v-for="item in FormBuilder">
            <component
              class="my-2"
              v-if="item.display"
              :is="item.component"
              v-bind="{
                ...item.props,
              }"
            />
          </template>
          <FileInput @update:file="updateFile" :file="task?.files" />
        </main>
        <main>
          <template v-for="item in DatePickerFormBuilder">
            <component
              v-if="item.display"
              :is="item.component"
              v-bind="{
                ...item.props,
              }"
            />
          </template>
        </main>
      </div>
    </v-card-text>
    <v-card-actions class="flex my-5 items-center justify-center">
      <v-btn variant="outlined" @click="$emit('action:close-dailog')"
        >Cancel</v-btn
      >
      <v-btn variant="outlined" type="submit">Submit</v-btn>
    </v-card-actions>
  </form>
</template>
