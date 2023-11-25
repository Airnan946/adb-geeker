/**
 * 命令工具
 */
import { Command } from "@tauri-apps/api/shell";

/**
 * 转换字符串命令为数组
 */
const parseCommand = (command) => {
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

/**
 * 判断是否为二进制字符串
 */
const isBinaryString = (str) => {
  for (var i = 0, len = str.length; i < len; i++) {
    var charCode = str.charCodeAt(i);
    if (charCode < 32 && charCode !== 9 && charCode !== 10 && charCode !== 13) {
      return true;
    }
  }
  return false;
}

/**
 * 内部无校验执行命令
 * @param {*} type 
 * @param {*} args 
 * @returns 
 */
const run = async (type, args) => {
  // 执行命令
  try {
    const exec_cmd = Command.sidecar(type, args, { encoding: "utf-8" });
    const result = await exec_cmd.execute();
    if ((result && result.code && result.code === 0) === 0) {
      // 如果是二进制字符串，转为 base64 字符串返回
      if (isBinaryString(result.stdout)) {
        // 待转二进制
        return { code: 0, data: result.stdout };
      } else {
        return { code: 0, data: result.stdout };
      }
    } else {
      return { code: 1, error: result.stderr };
    }
  } catch (error) {
    return { code: 1, error };
  }
}

/**
 * 外部带校验执行命令
 * @param {*} input 
 * @returns 
 */
export const execute = async (input) => {
  // 字符串验证
  if (typeof input !== "string") {
    return { code: 1, error: '请输入命令字符串' };
  }
  if (input.trim() == "") {
    return { code: 1, error: '请输入命令字符串' };
  }
  const args = parseCommand(input);
  let type = null;
  if (args.length < 3) {
    return { code: 1, error: '参数校验失败' };
  }
  // 判断命令类型并去除命令头
  if (args[0] === "adb") {
    type = "bin/adb"
    args.shift()
  } else if (args[0] === "fastboot") {
    type = "bin/fastboot"
    args.shift()
  } else {
    return { code: 1, error: '请输入 adb 或 fastboot 命令' };
  }
  return run(type, args);
}

export const cmds = {
  help: {
    name: '获取ADB帮助菜单',
    value: ["adb", "help"]
  },
}
/**
 * 内置 adb 命令列表
 */
export const adbCmd = {
  /**
   * 获取adb帮助菜单
   * @returns 
   */
  async help() {
    return await run("bin/adb", cmds.help.value.shift());
  },
  /**
   * 获取adb版本信息
   * @returns 
   */
  async version() {
    return await run("bin/adb", ["version"]);
  },
  /**
   * 获取设备列表
   * @returns 
   */
  async devices() {
    return await run("bin/adb", ["devices"]);
  },
  /**
   * 获取设备截图
   * @returns 
   */
  async screencap() {
    return await run("bin/adb", ["shell", "screencap", "-p"]);
  },
  /**
   * 获取设备名称
   * @returns 
   */
  async deviceName() {
    return await run("bin/adb", ["shell", "getprop", "ro.product.name"]);
  },
  /**
   * 获取设备型号
   * @returns 
   */
  async deviceModel() {
    return await run("bin/adb", ["shell", "getprop", "ro.product.model"]);
  },
  /**
   * 获取设备厂商
   * @returns 
   */
  async deviceCompany() {
    return await run("bin/adb", ["shell", "getprop", "ro.product.manufacturer"]);
  },
  /**
   * 获取设备序列号
   * @returns 
   */
  async deviceSerialNo() {
    return await run("bin/adb", ["get-serialno"]);
  },
  /**
   * 获取设备分辨率
   * @returns 
   */
  async devicePhysical() {
    return await run("bin/adb", ["shell", "wm", "size"]);
  },
  /**
   * 获取设备像素密度
   * @returns 
   */
  async deviceDensity() {
    return await run("bin/adb", ["shell", "wm", "density"]);
  },





}

/**
 * 内置 fastboot 命令列表
 */
export const fbCmd = {
  async help() {
    return await run("bin/fastboot", ["help"]);
  }
}
