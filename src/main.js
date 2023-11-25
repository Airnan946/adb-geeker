import { createApp, ref } from "vue";
import "./assets/styles/index.css";
import App from "./App.vue";
import pkgConfig from "../package.json";
import { message, confirm } from '@tauri-apps/api/dialog';
import { appWindow } from '@tauri-apps/api/window';
import { initTheme, changeTheme } from './utils/theme'
import { invoke } from "@tauri-apps/api/tauri";
import { Command } from "@tauri-apps/api/shell";

// 初始化主题
initTheme();
// 监听主题模式切换
const themelisten = appWindow.onThemeChanged(({ payload: theme }) => {
  changeTheme(theme)
});

// 全局配置项
const globalConfig = ref({
  // 版本信息
  version: {
    value: pkgConfig.version,
    hasNew: false,
    /**
     * 对比版本号
     * @param {*} local 本地版本
     * @param {*} remote 远程版本
     * @returns 
     */
    compare(local, remote) {
      return parseInt(remote.replace(/\./g, '')) > parseInt(local.replace(/\./g, ''));
    }
  },
  // 网络状态
  netinfo: {
    internet: false,
    server: false,
  },
  // loading组件
  loading: {
    status: false,
    text: "请稍等",
    /**
     * 显示Loading层
     * @param {*} text 提示文本
     */
    show(text) {
      this.status = true
      this.text = text ? text : '请稍等'
    },
    /**
     * 关闭Loading层
     */
    close() {
      this.status = false
      this.text = '请稍等'
    }
  },
  // Dialog组件
  dialog: {
    /**
     * Message弹框
     * @param {*} title 标题
     * @param {*} msg 内容
     * @param {*} type 类型，success/error等
     */
    async message(title, msg, type) {
      await message(msg, {
        title: title,
        type: type,
      });
    },
    /**
     * Confirm弹框
     * @param {*} title 标题
     * @param {*} msg 内容
     * @param {*} ok 确认按钮显示文本
     * @param {*} cancel 取消按钮显示文本
     */
    async confirm(title, msg, ok, cancel) {
      return await confirm(msg, {
        title: title,
        okLabel: ok ? ok : '确认',
        cancelLabel: cancel ? cancel : '取消'
      })
    }
  },
  // notify组件
  notify: {
    show(title, content, options) {
      //创建容器
      const notifyContainer = document.createElement('div');
      notifyContainer.classList.add('notify');
      // 创建标题
      const notifyTitle = document.createElement('div');
      notifyTitle.classList.add('notify-title');
      notifyTitle.textContent = title;
      notifyContainer.appendChild(notifyTitle);
      // 创建关闭按钮
      const closeButton = document.createElement('button');
      closeButton.classList.add('notify-close-btn');
      closeButton.addEventListener('click', () => {
        this.destroyed(notifyContainer);
      });
      notifyContainer.appendChild(closeButton);
      // 创建内容区
      const notifyContent = document.createElement('div');
      notifyContent.classList.add('notify-content');
      notifyContent.innerText = content;
      notifyContainer.appendChild(notifyContent);
      // 创建底部容器
      const notifyBottom = document.createElement('div');
      notifyBottom.classList.add('notify-bottom');
      // 创建默认按钮
      let mergedOption = [];
      const defaultOption = [
        {
          label: '知道了',
          fun() {
            globalConfig.value.notify.destroyed(notifyContainer);
          }
        }
      ]
      // 验证并合并其他按钮
      if (Array.isArray(options) && options.length !== 0) {
        // 逆序并合并
        mergedOption = defaultOption.concat(options.reverse()).reverse();
      }
      try {
        for (const option of mergedOption) {
          const btn = document.createElement('button');
          btn.classList.add('notify-option-btn');
          btn.textContent = option.label;
          if (typeof option.fun === 'function') {
            btn.addEventListener('click', option.fun);
          }
          notifyBottom.appendChild(btn);
        }
      } catch (error) {
        globalConfig.value.message.warning(`通知创建异常：${error}`);
      }
      notifyContainer.appendChild(notifyBottom);
      document.body.appendChild(notifyContainer);
      // 动画开始
      this.sort();
      setTimeout(() => {
        notifyContainer.style.transform = 'scale(1)';
        notifyContainer.style.opacity = '1';
        notifyContainer.style.right = '20px';
      }, 50);
      return notifyContainer
    }, sort() {
      let heightSum = 0;
      const notifys = document.querySelectorAll('.notify');
      notifys.forEach((notify, index) => {
        heightSum += notify.offsetHeight;
        notify.style.top = heightSum - notifys[0].offsetHeight + 15 * (index + 1) + 'px';
      });
    },
    destroyed(notifyObj) {
      notifyObj.style.transform = 'scale(0.7)';
      notifyObj.style.opacity = '0';
      setTimeout(() => {
        notifyObj.remove();
        this.sort();
      }, 50);
    }
  },
  // message组件
  message: {
    sort() {
      let heightSum = 0;
      const messages = document.querySelectorAll('.message-success,.message-info,.message-warning,.message-error');
      messages.forEach((message, index) => {
        heightSum += message.offsetHeight;
        message.style.top = heightSum - messages[0].offsetHeight + 15 * (index + 1) + 'px';
      });
    },
    show(type, text) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add(type);
      messageDiv.innerText = text;
      document.body.appendChild(messageDiv);
      this.sort();
      setTimeout(() => {
        messageDiv.style.transform = 'scale(1)';
        messageDiv.style.opacity = '1';
      }, 50);
      setTimeout(() => {
        messageDiv.style.transform = 'scale(0.7)';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
          messageDiv.remove();
          this.sort();
        }, 50);
      }, 5000);
    },
    success(text) {
      this.show("message-success", text)
    },
    info(text) {
      this.show("message-info", text)
    },
    warning(text) {
      this.show("message-warning", text)
    },
    error(text) {
      this.show("message-error", text)
    }
  },
  // db操作
  db: {
    get(key) {
      return localStorage.getItem(key)
    },
    set(key, val) {
      localStorage.setItem(key, val)
    },
    del(key) {
      localStorage.removeItem(key)
    }
  },
  // 剪切板
  clipboard: {
    copy(text) {
      if (text.trim() === "") {
        globalConfig.value.message.warning(`无法复制：内容为空！`);
        return;
      }
      let tip = '';
      if (text.length > 50) {
        tip = text.replaceAll("\n", "").substring(0, 50) + '...';
      } else {
        tip = text;
      }
      navigator.clipboard.writeText(text)
        .then(() => {
          globalConfig.value.message.success(`已复制到剪贴板：${tip}`);
        })
        .catch(error => {
          globalConfig.value.message.error(`复制失败：${error}`);
        });
    }
  },
  cmd: {
    async adb(args) {
      return this.exec("bin/adb", args);
    },
    async fastboot(args) {
      return this.exec("bin/fastboot", args);
    },
    async exec(type, args) {
      // 参数校验
      if (!Array.isArray(args)) {
        globalConfig.value.message.error('执行命令失败: 参数不能为空！');
        return null;
      }
      // 执行命令
      try {
        const exec_cmd = Command.sidecar(type, args, { encoding: "utf-8" });
        const result = await exec_cmd.execute();
        console.log(result.stdout)
        if ((result && result.code && result.code === 0) === 0) {
          // 如果是二进制字符串，转为 base64 字符串返回
          console.log(this.isBinaryString(result.stdout))
          if (this.isBinaryString(result.stdout)) {
            this.binaryStringToBase64(result.stdout, function (error, base64String) {
              if (error) {
                globalConfig.value.message.error(error);
                return null;
              } else {
                return this.binaryStringToBase64(base64String);
              }
            });

          } else {
            return result.stdout;
          }
        } else {
          globalConfig.value.message.error(`执行命令失败，: ${result.stderr}`);
        }
      } catch (error) {
        globalConfig.value.message.error(`执行命令失败，捕捉到异常: ${error}`);
        return null;
      }
    },
    // 判断是否为二进制字符串
    isBinaryString(str) {
      for (var i = 0, len = str.length; i < len; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode < 32 && charCode !== 9 && charCode !== 10 && charCode !== 13) {
          return true;
        }
      }
      return false;
    },
    // 非文本二进制字符串转 base64 字符串
    binaryStringToBase64(binaryString, callback) {
      try {
        var blob = new Blob([binaryString], { type: 'application/octet-binary' });

        var reader = new FileReader();
        reader.onload = function () {
          var base64String = reader.result.split(',')[1];
          callback(null, base64String);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        callback(`执行命令失败，二进制输出转换失败: ${error}`);
      }
    },
    parseCommand(command) {
      let args = [];
      let currentArg = '';
      let insideQuotes = false;

      for (const char of command) {
        if (char === ' ' && !insideQuotes) {
          if (currentArg !== '') {
            args.push(currentArg);
            currentArg = '';
          }
        } else if (char === '"') {
          insideQuotes = !insideQuotes;
        } else {
          currentArg += char;
        }
      }

      if (currentArg !== '') {
        args.push(currentArg);
      }

      return args;
    }

  }
});

createApp(App)
  .provide("globalConfig", globalConfig)
  .mount("#app");
