<template>
  <button :class="buttonClass" :disabled="isDisabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default",
      validator: (value) =>
        ["default", "primary", "info", "success", "warning", "error"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      return `button-${this.type}${this.block ? ' button-block' : ''}`;
    },
    isDisabled() {
      return this.disabled;
    },
  },
};
</script>
