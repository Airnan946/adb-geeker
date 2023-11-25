<template>
  <div id="home">
    <div class="phone-view">
      <div id="phone-screen" class="no-select"><img class="no-select" v-if="imgData" :src="imgData" /></div>
      <a-button type="primary" @click="getScreenImg">刷新截图</a-button>
    </div>
    <div class="phone-info">
      <table>
        <thead>
          <td colspan="3">设备信息</td>
        </thead>
        <tr v-for="(infoKey, index) in Object.keys(deviceInfo)" :key="index">
          <td>{{ deviceInfo[infoKey].name }}</td>
          <td>{{ deviceInfo[infoKey].value }}</td>
        </tr>
      </table>

    </div>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import AButton from "../../components/a-button/index.vue";
import { adbCmd } from "../../utils/cmd"
const globalConfig = inject("globalConfig");

const imgData = ref("");
const deviceInfo = ref({
  name: {
    name: "设备名称",
    value: ""
  },
  model: {
    name: "设备型号",
    value: ""
  },
  manufacturer: {
    name: "生产厂商",
    value: ""
  },
  serialno: {
    name: "序列号",
    value: ""
  },
  size: {
    name: "分辨率",
    value: ""
  },
  density: {
    name: "像素密度",
    value: ""
  },
});

/**
 * 捕获截图
 */
const getScreenImg = async () => {
  const result = await adbCmd.screencap();
  if (result.code === 0) {
    globalConfig.value.message.success("获取截图成功");
    imgData.value = 'data:image/png;base64,' + result;
  } else {
    globalConfig.value.message.error(result.error);
  }
}
/**
 * 获取设备信息
 */
const getPhoneInfo = async () => {
  // 设备名称
  deviceInfo.value.name.value = (await adbCmd.deviceName()).data;
  // 设备型号
  deviceInfo.value.model.value = (await adbCmd.deviceModel()).data;
  // 厂商
  deviceInfo.value.manufacturer.value = (await adbCmd.deviceCompany()).data;
  // 序列号
  deviceInfo.value.serialno.value = (await adbCmd.deviceSerialNo()).data;
  // 分辨率
  deviceInfo.value.size.value = (await adbCmd.devicePhysical()).data;
  if (deviceInfo.value.size.value !== null) {
    deviceInfo.value.size.value = deviceInfo.value.size.value.split(": ")[1]
  }
  // 像素密度
  deviceInfo.value.density.value = (await adbCmd.deviceDensity()).data;
  if (deviceInfo.value.density.value !== null) {
    deviceInfo.value.density.value = deviceInfo.value.density.value.split(": ")[1]
  }
  // 计算分辨率
  calcScreenSize(deviceInfo.value.size.value);


}
const calcScreenSize = (size) => {
  let sizeArray = size.split("x");
  let width = sizeArray[0];
  let height = sizeArray[1];
  let newHeight = parseInt(height / (width / 260));
  document.getElementById("phone-screen").style.height = newHeight + "px";
}
onMounted(async () => {
  getPhoneInfo();

});
</script>
<style scoped>
#home {
  display: flex;
}

.phone-view {
  width: 40%;
  min-width: 400px;
  text-align: center;
}

.phone-info {
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
}

#phone-screen {
  box-sizing: border-box;
  padding: 0;
  width: 270px;
  min-height: 550px;
  margin: 0 auto;
  border-radius: 30px;
  border: 5px solid #303030;
  background-color: black;
  overflow: hidden;
}

#phone-screen img {
  width: 100%;
  height: auto;
}
</style>
