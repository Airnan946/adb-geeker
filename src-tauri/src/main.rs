// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use std::process::Command;

use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

/**
 * 主函数
 */
fn main() {
    check_process();
    // 定义托盘退出菜单
    let quit = CustomMenuItem::new("quit".to_string(), "退出程序");
    // 定义托盘隐藏窗口菜单
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏窗口");
    // 定义托盘菜单项
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    // 添加系统托盘
    let system_tray = SystemTray::new().with_menu(tray_menu);
    // 构建应用程序
    tauri::Builder::default()
        .setup(|app| {
            // 设置Windows下托盘图标的提示文本
            app.app_handle()
                .tray_handle()
                .set_tooltip("ADB 极客儿")
                .unwrap();
            Ok(())
        })
        // 关闭窗口事件
        .on_window_event(|event| {
            match event.event() {
                tauri::WindowEvent::CloseRequested { api, .. } => {
                    // 阻止默认关闭
                    api.prevent_close();
                    // macos 下最小化
                    if cfg!(target_os = "macos") {
                        event.window().minimize().unwrap();
                    } else {
                        // windows 下隐藏窗口
                        event.window().hide().unwrap();
                        // 修改托盘菜单为“显示窗口”
                        let item_handle =
                            event.window().app_handle().tray_handle().get_item("hide");
                        item_handle.set_title("显示窗口").unwrap();
                    }
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| menu_handle(app, event))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/**
 * 托盘菜单事件
 */
fn menu_handle(app_handle: &tauri::AppHandle, event: SystemTrayEvent) {
    // 获取应用窗口
    let window = app_handle.get_window("main").unwrap();
    match event {
        // 双击图标事件
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            // 显示窗口
            window.show().unwrap();
            // 修改托盘菜单为“隐藏窗口”
            let item_handle = app_handle.tray_handle().get_item("hide");
            item_handle.set_title("隐藏窗口").unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "hide" => {
                let item_handle = app_handle.tray_handle().get_item(&id);
                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                    item_handle.set_title("显示窗口").unwrap();
                } else {
                    window.show().unwrap();
                    item_handle.set_title("隐藏窗口").unwrap();
                }
            }
            _ => {}
        },
        _ => {}
    }
}

/**
 * 检查进程，防止重复运行
 */
fn check_process() {
    let process_name = "AdbGeeker";

    let occurrences = (|| {
        #[cfg(target_os = "windows")]
        let output = Command::new("cmd")
            .arg("/C")
            .arg("tasklist")
            .creation_flags(0x08000000)
            .output()
            .expect("Failed to run command");
        #[cfg(target_os = "macos")]
        let output = Command::new("ps")
            .arg("-ax")
            .output()
            .expect("Failed to run command");

        String::from_utf8_lossy(&output.stdout)
            .split('\n')
            .filter(|line| line.contains(process_name))
            .count()
    })();

    if occurrences >= 2 {
        std::process::exit(0);
    }
}
