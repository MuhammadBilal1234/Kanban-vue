<script setup lang="ts">
import { toRef, watch } from "vue";
import { useField } from "vee-validate";

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
</script>

<template>
  <v-select
    :name="name"
    :id="name"
    :type="type"
    v-model="inputValue"
    size="large"
    :label="label"
    variant="outlined"
    :disabled="disabled"
    :items="selectOptions"
    :autofocus="false"
    :placeholder="placeholder"
    @change="handleChange"
    @blur="handleBlur"
    :error-messages="errorMessage"
  />
</template>
