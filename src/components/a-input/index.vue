<template>
  <div class="a-input">
    <label class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input :type="inputType" :placeholder="placeholder" :value="inputValue"
        @input="updateInputValue($event.target.value)" @blur="onBlur" />
      <div v-if="type === 'password'" class="toggle-password" @mousedown="togglePasswordVisibility">
        <svg v-if="showPassword" class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z"
            p-id="8685" fill="#707070"></path>
          <path
            d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
            p-id="8686" fill="#707070"></path>
        </svg>
        <svg v-else class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M942.3 486.4l-0.1-0.1-0.1-0.1c-36.4-76.7-80-138.7-130.7-186L760.7 351c43.7 40.2 81.5 93.7 114.1 160.9C791.5 684.2 673.4 766 512 766c-51.3 0-98.3-8.3-141.2-25.1l-54.7 54.7C374.6 823.8 439.8 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0.1-51.3zM878.3 154.2l-42.4-42.4c-3.1-3.1-8.2-3.1-11.3 0L707.8 228.5C649.4 200.2 584.2 186 512 186c-192.2 0-335.4 100.5-430.2 300.3v0.1c-7.7 16.2-7.7 35.2 0 51.5 36.4 76.7 80 138.7 130.7 186.1L111.8 824.5c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4c3.1 3.1 8.2 3.1 11.3 0l712.8-712.8c3.1-3 3.1-8.1 0-11.2zM398.9 537.4c-1.9-8.2-2.9-16.7-2.9-25.4 0-61.9 50.1-112 112-112 8.7 0 17.3 1 25.4 2.9L398.9 537.4z m184.5-184.5C560.5 342.1 535 336 508 336c-97.2 0-176 78.8-176 176 0 27 6.1 52.5 16.9 75.4L263.3 673c-43.7-40.2-81.5-93.7-114.1-160.9C232.6 339.8 350.7 258 512 258c51.3 0 98.3 8.3 141.2 25.1l-69.8 69.8z"
            p-id="8370" data-spm-anchor-id="a313x.collections_detail.0.i0.27753a81TNBhlS" fill="#707070"></path>
          <path
            d="M508 624c-6.4 0-12.7-0.5-18.8-1.6l-51.1 51.1c21.4 9.3 45.1 14.4 69.9 14.4 97.2 0 176-78.8 176-176 0-24.8-5.1-48.5-14.4-69.9l-51.1 51.1c1 6.1 1.6 12.4 1.6 18.8C620 573.9 569.9 624 508 624z"
            p-id="8371" fill="#707070"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocused: false,
      showPassword: false,
      inputValue: "",
    };
  },
  props: {
    type: {
      type: String,
      default: "text",
      validator: (value) => ["text", "password"].includes(value),
    },
    placeholder: {
      type: String,
      default: "请输入...",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Label",
    },
  },
  computed: {
    inputType() {
      return this.showPassword ? "text" : this.type;
    },
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
  },
  mounted() {
    // 在组件挂载时监听全局的mouseup事件
    window.addEventListener("mouseup", this.onGlobalMouseUp);
  },

  beforeDestroy() {
    // 在组件销毁前移除mouseup事件监听
    window.removeEventListener("mouseup", this.onGlobalMouseUp);
  },
  methods: {
    updateInputValue(value) {
      this.inputValue = value;
      this.$emit("input", this.inputValue);
      this.$emit('update:value', value);
    },
    togglePasswordVisibility(event) {
      event.preventDefault(); // 阻止默认事件，避免失去焦点
      this.showPassword = !this.showPassword;
    },
    onBlur() {
      this.$emit("input", this.inputValue);
    },
    onGlobalMouseUp(event) {
      event.preventDefault(); // 阻止默认事件，避免失去焦点
      // 在鼠标松开时恢复密码可见性状态
      if (this.showPassword) {
        this.showPassword = false;
      }
    },
  },
};
</script>

<style scoped>
.a-input {
  display: flex;
  align-items: center;
  height: 40px;
  margin: 5px 0;
}

.input-label {
  width: 50px;
  text-align: right;
  margin-right: 10px;
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
}

input {
  width: calc(100% - 30px);
  padding: 10px;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.toggle-password {
  position: absolute;
  top: 60%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
}

.toggle-password svg path {
  fill: gray;
}

input[type="password"]::-ms-reveal {
  display: none;
}
</style>
