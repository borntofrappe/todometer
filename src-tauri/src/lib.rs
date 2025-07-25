use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_initial_table",
        sql: "CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            status TEXT DEFAULT 'pending'
        );",
        kind: MigrationKind::Up,
    }];

    let mut builder = tauri::Builder::default();
    #[cfg(desktop)]
    {
        use tauri::Manager;
        use tauri_plugin_positioner::{Position, WindowExt};

        builder = builder
            .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
                let _ = app
                    .get_webview_window("main")
                    .expect("no main window")
                    .set_focus();
            }))
            .plugin(tauri_plugin_positioner::init())
            .setup(|app| {
                let win = app.get_webview_window("main").unwrap();
                let _ = win.set_title("todometer");
                let _ = win.as_ref().window().move_window(Position::Center);
                let _ = win.show();
                Ok(())
            });
    }

    builder
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:todos.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
