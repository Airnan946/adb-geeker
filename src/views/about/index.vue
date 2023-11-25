<template>
  <div id="about">
    <div class="container">
      <div class="list">
        <div class="list-box">
          <div class="content">
            <span class="title"> 版本</span>
            <span class="text">ADB 极客儿 v{{ globalConfig.version.value }}
              <span v-if="globalConfig.version.hasNew" @click="check" style="color: white;
                                      background-color: #ff5252;
                                      font-size: 0.8em;padding: 2px;
                                      border-radius: 4px;
                                      top: -1px;left: 2px;
                                      position: relative;
                                      cursor: pointer;">
                发现新版本
              </span></span>
          </div>
          <div class="option">
            <a-button type="primary" @Click="check">检测更新</a-button>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-box">
          <div class="content">
            <span class="title">作者</span>
            <span class="text">@Airnan</span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-box">
          <div class="content">
            <span class="title">问题反馈</span>
            <span class="text">将问题和截图发送至邮箱<a href="javascript:void(0);"
                @click="globalConfig.clipboard.copy('zhangyuge946@163.com')">zhangyuge946@163.com</a>。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
import AButton from "../../components/a-button/index.vue";
import { open } from '@tauri-apps/api/shell';

const globalConfig = inject("globalConfig");

const check = () => {
  // globalConfig.value.loading.show("正在检测更新...");

};

</script>
<style scoped>
#about {
  padding: 5px;
}

.container {
  text-align: center;
  width: 100%;
}

.list {
  margin: 5px 0;
  border-radius: 8px;
  overflow: hidden;
}

.list .list-box {
  text-align: left;
  width: 100%;
  height: auto;
  min-height: 50px;
  border-radius: 8px;
  padding: 5px 0;
  transition: background-color 0.3s;
  overflow: hidden;
}

.content {
  float: left;
  width: calc(100% - 100px - 10px);
  height: auto;
  min-height: 50px;
  text-align: left;
}

.list .content .title,
.list .content .text {
  display: inline-block;
  padding-left: 15px;
  line-height: 25px;
  width: 100%;
}

.list .content .text a {
  color: #0052d9;
}

.list .content .title {
  height: 25px;
  font-weight: bold;
  font-size: 1em;
}

.list .content .text {
  height: auto;
  min-height: 25px;
  font-size: 0.9em;
}

.list .option {
  float: left;
  text-align: center;
  width: 100px;
  height: 50px;
  line-height: 50px;
}

.option button {
  font-size: 0.8em;
}
</style>
