<script setup lang="ts">
import { toRef, watch } from "vue";
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },

  selectOptions: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  setValue,
} = useField(name, undefined, {
  initialValue: props.value,
  validateOnMount: false,
});

const minDateTillToday = computed(() => {
  let currentDate = new Date();
  const prevDate = currentDate.setDate(currentDate.getDate() - 1);
  return new Date(prevDate);
});
</script>

<template>
  <v-date-picker
    :name="name"
    :id="name"
    :type="type"
    size="large"
    :label="label"
    variant="outlined"
    hide-actions
    v-model="inputValue"
    :disabled="disabled"
    :min="minDateTillToday"
    :autofocus="false"
    :placeholder="placeholder"
    @change="handleChange"
    @click:save="handleChange"
    @blur="handleBlur"
    :error-messages="errorMessage"
  >
  </v-date-picker>
</template>
