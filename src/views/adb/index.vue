<template>
  <div id="apps">
    <div class="container">
      <span class="title">命令执行：</span>
      <div class="cmd_input_container">
        <input class="cmd_input" type="text" placeholder="请输入 ADB 命令，然后点击执行按钮或按下回车键开始执行" v-model="cmd"
          @keyup.enter="run" />
        <a-button class="cmd_btn" type="primary" @Click="run" :disable="enableBtn">执行</a-button>
      </div>
      <span class="title">结果输出：</span>
      <textarea id="logs" class="a-textarea" :value="outPrint" readonly></textarea>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import AButton from "../../components/a-button/index.vue";
const globalConfig = inject("globalConfig");

const enableBtn = ref(false)
const cmd = ref("");
let outPrint = ref("");
const run = async () => {
  enableBtn.value = true
  const result = await globalConfig.value.cmd.adb(globalConfig.value.cmd.parseCommand(cmd.value));
  if (result !== null) {
    writeLog("--> " + cmd.value + "\n" + result);
  }

}
const writeLog = (text) => {
  const logArea = document.getElementById("logs");
  if (outPrint.value.length > 0) {
    outPrint.value += "\n";
  }
  let textArray;
  if (text.length > 1000) {
    textArray = text.split("\n");
  } else {
    textArray = text.split("");
  }
  for (let i = 0; i < textArray.length; i++) {
    (function (i) {
      setTimeout(function () {
        if (text.length > 1000) {
          outPrint.value += "\n" + textArray[i];
        } else {
          outPrint.value += textArray[i];
        }
        logArea.scrollTop = logArea.scrollHeight;
      }, 5 * i);
    })(i);
  }
  enableBtn.value = false
};


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

.title {
  display: inline-block;
  width: 100%;
  padding: 5px;
  text-align: left;
  color: #606060;
  font-weight: bold;
}

textarea {
  height: calc(100vh - 170px);
}
</style>
