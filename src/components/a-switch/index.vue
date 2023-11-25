<template>
  <div class="a-switch" :class="{ 'is-checked': checked }">
    <input
      class="a-switch__input"
      ref="input"
      type="checkbox"
      :checked="checked"
      @change="handleInput"
      :true-value="trueValue"
      :false-value="falseValue"
    />
    <span class="a-switch_action"></span>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";
const props = defineProps({
  modelValue: {
    //绑定值，必须等于active-value或inactive-value，默认为Boolean类型  如果是vue2 这里绑定是 `value`
    type: [Number, String, Boolean],
  },
  trueValue: {
    //switch 打开时的值 可以自定义组件打开的时的值
    type: [Number, String, Boolean],
    default: true,
  },
  falseValue: {
    //	switch 关闭时的值  可以自定义组件关闭的时的值
    type: [Number, String, Boolean],
    default: true,
  },
  activeColor: {
    //switch 打开时的背景色
    type: [String],
    default: "#409EFF",
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

//获取input元素
const input = ref(null);
//判断当前组件是否是打开状态
const checked = computed(() => {
  //因为可以自定义打开和关闭的值 所以这里必须判断 v-model绑定的值 === 组件自定义打开的值
  return props.modelValue === props.trueValue;
});
//input事件 获取当前input事件
const handleInput = () => {
  nextTick(() => {
    const val = input.value.checked;
    emits("update:modelValue", val); // 开关点击后的状态传给v-model
    emits("change", val); //给组件增加change 事件
  });
};
</script>

<style scoped>
.a-switch {
  position: relative;
  height: 50px;
  transition: background 0.2s;
  width: 100px;
  background: #ff3030;
  border-radius: 100px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.a-switch .a-switch__input {
  position: relative;
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.a-switch .a-switch_action {
  position: absolute;
  transition: 0.2s;
  left: 5px;
  top: 5px;
  z-index: 0;
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 100px;
}
.a-switch.is-checked {
  background: #18a058;
}
.a-switch.is-checked .a-switch_action {
  left: 100%;
  background: #fff;
  margin-left: -45px;
}
</style>
