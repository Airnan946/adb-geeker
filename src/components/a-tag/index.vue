<template>
  <span :class="tagClass">
    <slot></slot>
  </span>
</template>

<script setup>
import { toRefs, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
    validator: (value) => ["success", "error", "info"].includes(value),
  },
});
const { type } = toRefs(props);
const tagClass = computed(() => ({
  "tag-success": type.value === "success",
  "tag-error": type.value === "error",
  "tag-info": type.value === "info",
}));
</script>
<style scoped>
.tag-success {
  background-color: rgba(24, 160, 88, 0.12);
  color: #18a058;
}

.tag-error {
  background-color: rgba(208, 48, 80, 0.1);
  color: #d03050;
}

.tag-info {
  background-color: rgba(32, 128, 240, 0.12);
  color: #2080f0;
}

span {
  height: 20px;
  line-height: 20px;
  font-size: 0.9em;
  padding: 2px 8px;
  border-radius: 0.25em;
  margin: 2px 2px;
  display: inline-block;
}
</style>
