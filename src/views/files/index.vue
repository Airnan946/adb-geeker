<template>
  <div id="apps">
    <div class="container">
      <span class="title">文件管理</span>
      
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import AButton from "../../components/a-button/index.vue";
import { open } from '@tauri-apps/api/shell';
import { invoke } from "@tauri-apps/api/tauri";

const globalConfig = inject("globalConfig");
// 文件路径
const adbFilePath = ref("");

const cmd = ref("");
let outPrint = ref("");
const run = async () => {
  const result = await invoke("run_adb_command", { args: parseCommand(cmd.value) });
  writeLog("--> " + cmd.value + "\n" + result);
}
const writeLog = (text) => {
  const logArea = document.getElementById("logs");
  if (outPrint.value.length > 0) {
    outPrint.value += "\n";
  }
  let textArray = text.split("");
  for (let i = 0; i < textArray.length; i++) {
    (function (i) {
      setTimeout(function () {
        outPrint.value += textArray[i];
        logArea.scrollTop = logArea.scrollHeight;
      }, 5 * i);
    })(i);
  }

};

// 解析带引号的命令
const parseCommand = (command) => {
  const args = [];
  let currentArg = '';

  let insideQuotes = false;

  for (let i = 0; i < command.length; i++) {
    const char = command[i];

    if (char === ' ' && !insideQuotes) {
      // 如果遇到空格且不在引号内，将当前参数保存，并重置 currentArg
      args.push(currentArg);
      currentArg = '';
    } else if (char === '"') {
      // 切换引号状态
      insideQuotes = !insideQuotes;
    } else {
      // 将字符添加到当前参数
      currentArg += char;
    }
  }

  // 添加最后一个参数
  args.push(currentArg);

  return args;
}
</script>
<style scoped>
#apps {
  padding: 5px;
  overflow: hidden;
}

.container {
  text-align: center;
  overflow: hidden;
}

.cmd_input_container {
  display: flex;
  width: 100%;
}

.cmd_input {
  flex: 1;
}
.title{
  display: inline-block;
  width: 100%;
  padding: 5px;
  font-size: 1.1em;
  text-align: left;
  color: #606060;
  font-weight: bold;
}

textarea{
  height: calc(100vh - 170px);
}
</style>
