<template>
    <div class="collapsible-panel">
      <div class="panel-header" @click="toggleCollapse">
        <div class="left-section">
            <span class="toggle-icon">
                <svg v-if="collapsed" t="1695364239975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3608" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M904.533333 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 644.266667 179.2 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333l362.666666 362.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8l362.666666-362.666667c17.066667-17.066667 17.066667-42.666667 0-59.733333z" p-id="3609" fill="#707070"></path></svg>
                <svg v-else t="1695364227879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3414" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z" p-id="3415" fill="#707070"></path></svg>    
            </span>
            <span class="title">{{ title }}</span>
        </div>
        <span class="sub">{{ sub }}</span>
      </div>
      <div v-if="!collapsed" class="panel-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const collapsed = ref(true);
  
  const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
  };
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    sub: {
      type: String,
      default: ''
    }
  });
  </script>
  
  <style scoped>
  .collapsible-panel {
    margin-bottom: 5px;
    border-radius: 8px;
    overflow: hidden;
  }

  .panel-header {
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    transition: background-color 0.3s;
  }
  
  .left-section {
     display: flex;
     align-items: center;
    }

  .title {
    font-weight: bold;
    margin-left: 10px;
  }
  
  .sub {
    margin-left: 10px;
    font-size: 14px;
  }
  
  .toggle-icon {
    font-size: 18px;
    height: 20px;
  }
  
  .panel-content {
    padding: 10px;
    cursor: auto;
    user-select: auto;
    -webkit-user-select: auto;
  }
  </style>
  