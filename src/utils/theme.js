
import { appWindow } from '@tauri-apps/api/window';

/**
 * 初始化主题
 */
export async function initTheme() {
    const theme = await appWindow.theme();
    changeTheme(theme);
}

/**
 * 切换主题
 * @param {*} theme 
 */
export async function changeTheme(theme) {
    if (theme === "light") {
        setTheme(false)
    } else {
        setTheme(true)
    }
}

/**
 * 设置深色主题
 * @param {*} dark true or false
 */
function setTheme(dark) {
    // 背景色
    document.documentElement.style.setProperty("--theme-bg-color", dark ? "#252628" : "#e5e8ed");
    // 前景色
    document.documentElement.style.setProperty("--theme-fg-color", dark ? "#161719" : "#ffffff88");
    /* 字体色 */
    document.documentElement.style.setProperty("--theme-text-color", dark ? "#888888" : "#444444");
    /* 灰度字体色 */
    document.documentElement.style.setProperty("--theme-text-gray-color", dark ? "#666666" : "#999999");
    /* 边框颜色 */
    document.documentElement.style.setProperty("--theme-border-color", dark ? "#ffffff10" : "#00000007");
    /* 阴影颜色 */
    document.documentElement.style.setProperty("--theme-shadow-color", dark ? "#00000099" : "#00000020");
    /* 悬浮颜色 */
    document.documentElement.style.setProperty("--theme-hover-color", dark ? "#00000020" : "#00000010");
    /* 模糊背景颜色 */
    document.documentElement.style.setProperty("--theme-blur-color", dark ? "#00000055" : "#ffffff88");
    /* default按钮颜色 */
    document.documentElement.style.setProperty("--theme-btn-default-color", dark ? "#888888" : "#555555");
    document.documentElement.style.setProperty("--theme-btn-default-disable-color", dark ? "#444444" : "#33363999");
    document.documentElement.style.setProperty("--theme-btn-default-bg-color", dark ? "#2e333899" : "#2e333820");
    document.documentElement.style.setProperty("--theme-btn-default-hover-bg-color", dark ? "#2e333855" : "#2e333830");
    document.documentElement.style.setProperty("--theme-btn-default-active-bg-color", dark ? "#2e333821" : "#2e333821");
    /* primary按钮颜色 */
    document.documentElement.style.setProperty("--theme-btn-primary-color", dark ? "#0052d9" : "#0052d9");
    document.documentElement.style.setProperty("--theme-btn-primary-disable-color", dark ? "#0052d999" : "#0052d999");
    document.documentElement.style.setProperty("--theme-btn-primary-bg-color", dark ? "#0052d929" : "#0052d929");
    document.documentElement.style.setProperty("--theme-btn-primary-hover-bg-color", dark ? "#0052d938" : "#0052d938");
    document.documentElement.style.setProperty("--theme-btn-primary-active-bg-color", dark ? "#0052d947" : "#0052d947");
    /* info按钮颜色 */
    document.documentElement.style.setProperty("--theme-btn-info-color", dark ? "#2080f0" : "#2080f0");
    document.documentElement.style.setProperty("--theme-btn-info-disable-color", dark ? "#2080f099" : "#2080f099");
    document.documentElement.style.setProperty("--theme-btn-info-bg-color", dark ? "#2080f029" : "#2080f029");
    document.documentElement.style.setProperty("--theme-btn-info-hover-bg-color", dark ? "#2080f038" : "#2080f038");
    document.documentElement.style.setProperty("--theme-btn-info-active-bg-color", dark ? "#2080f047" : "#2080f047");
    /* success按钮颜色 */
    document.documentElement.style.setProperty("--theme-btn-success-color", dark ? "#18a058" : "#18a058");
    document.documentElement.style.setProperty("--theme-btn-success-disable-color", dark ? "#18a05899" : "#18a05899");
    document.documentElement.style.setProperty("--theme-btn-success-bg-color", dark ? "#18a05829" : "#18a05829");
    document.documentElement.style.setProperty("--theme-btn-success-hover-bg-color", dark ? "#18a05838" : "#18a05838");
    document.documentElement.style.setProperty("--theme-btn-success-active-bg-color", dark ? "#18a05847" : "#18a05847");
    /* warning按钮颜色 */
    document.documentElement.style.setProperty("--theme-btn-warning-color", dark ? "#f0a020" : "#f0a020");
    document.documentElement.style.setProperty("--theme-btn-warning-disable-color", dark ? "#f0a02099" : "#f0a02099");
    document.documentElement.style.setProperty("--theme-btn-warning-bg-color", dark ? "#f0a02029" : "#f0a02029");
    document.documentElement.style.setProperty("--theme-btn-warning-hover-bg-color", dark ? "#f0a02038" : "#f0a02038");
    document.documentElement.style.setProperty("--theme-btn-warning-active-bg-color", dark ? "#f0a02047" : "#f0a02047");
    /* error按钮颜色 */
    document.documentElement.style.setProperty("--theme-btn-error-color", dark ? "#d03050" : "#d03050");
    document.documentElement.style.setProperty("--theme-btn-error-disable-color", dark ? "#d0305099" : "#d0305099");
    document.documentElement.style.setProperty("--theme-btn-error-bg-color", dark ? "#d0305029" : "#d0305029");
    document.documentElement.style.setProperty("--theme-btn-error-hover-bg-color", dark ? "#d0305038" : "#d0305038");
    document.documentElement.style.setProperty("--theme-btn-error-active-bg-color", dark ? "#d0305047" : "#d0305047");
}
