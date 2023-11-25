<template>
  <div id="main" class="no-select" data-tauri-drag-region>
    <div class="menu-box" data-tauri-drag-region>
      <div class="menu-items" data-tauri-drag-region>
        <img src="../src-tauri/icons/128x128.png" class="logo no-select" data-tauri-drag-region>
        <span class="logo-text no-select" data-tauri-drag-region>ADB Geeker</span>
        <button v-for="(menu, index) in menus" :key="index" @click="selectMenu(index)"
          :class="selectMenuIndex === index ? 'select-menu' : ''">
          {{ menu }}
        </button>
      </div>
    </div>
    <div v-if="selectMenuIndex === 0" class="main-panel">
      <span class="main-panel-title" data-tauri-drag-region>{{ menus[selectMenuIndex] }}</span>
      <div class="main-panel-content">
        <home />
      </div>
    </div>
    <div v-if="selectMenuIndex === 1" class="main-panel">
      <span class="main-panel-title" data-tauri-drag-region>{{ menus[selectMenuIndex] }}</span>
      <div class="main-panel-content">
        <adb />
      </div>
    </div>
    <div v-if="selectMenuIndex === 2" class="main-panel">
      <span class="main-panel-title" data-tauri-drag-region>{{ menus[selectMenuIndex] }}</span>
      <div class="main-panel-content">
        <files />
      </div>
    </div>
    <div v-if="selectMenuIndex === 3" class="main-panel">
      <span class="main-panel-title" data-tauri-drag-region>{{ menus[selectMenuIndex] }}</span>
      <div class="main-panel-content">
        <about />
      </div>
    </div>
    <a-loading v-if="globalConfig.loading.status === true" />
  </div>
</template>
<script setup>
import { ref, inject, onMounted } from "vue";
import ALoading from "./components/a-loading/index.vue";
import About from "./views/about/index.vue";
import Home from "./views/home/index.vue";
import Adb from "./views/adb/index.vue";
import Files from "./views/files/index.vue";

const globalConfig = inject("globalConfig");

/**
 * 菜单项
 */
const menus = ref(['我的机机', '命令助手', '文件管理', '关于软件']);

/**
 * 选中的菜单索引
 */
const selectMenuIndex = ref(0);

/**
 * 切换菜单按钮
 */
const selectMenu = (index) => {
  selectMenuIndex.value = index;
};



/**
 * 禁用开发者工具
 */
const disableDev = () => {
  // 屏蔽右键菜单
  document.addEventListener("contextmenu", function (event) {
    // 排除 input 和 textarea
    if (
      event.target.tagName.toLowerCase() !== "input" &&
      event.target.tagName.toLowerCase() !== "textarea"
    ) {
      event.preventDefault();
    }
  });
  // 禁止F12开发者工具
  document.addEventListener("keydown", function (event) {
    if (event.key === "F12") {
      event.preventDefault();
    }
  });
};

onMounted(() => {
  // 禁用开发者工具
  // disableDev()
});
</script>
<style scoped></style>
