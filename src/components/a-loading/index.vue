<template>
  <div class="loading">
    <div class="loader"></div>
    <span class="tips">{{ globalConfig.loading.text }}</span>
  </div>
</template>
<script setup>
import { inject } from "vue";
const globalConfig = inject("globalConfig");
</script>
<style scoped>
.loader {
  position: fixed;
  width: 50px;
  height: 50px;
  perspective: 200px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.loader:before,
.loader:after {
  position: fixed;
  width: 20px;
  height: 20px;
  content: "";
  animation: jumping 0.5s infinite alternate;
  background: #0052d9;
}

.loader:before {
  left: 0;
}

.loader:after {
  right: 0;
  animation-delay: 0.15s;
}

@keyframes jumping {
  0% {
    transform: scale(1) translateY(0px) rotateX(0deg);
    box-shadow: 0 0 0 #0052d955;
  }

  100% {
    transform: scale(1.2) translateY(-25px) rotateX(45deg);
    background: #0052d9ff;
    box-shadow: 0 25px 40px rgb(1, 36, 94);
  }
}

.tips {
  display: block;
  width: 100vw;
  height: 30px;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding-top: 40px;
}

.loading {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  text-align: center;
  color: #0052d9;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}
</style>
