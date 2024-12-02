import { app, BrowserWindow, dialog, ipcMain } from "electron";
import fs from "fs";
import convertCSV from "./src/client-side/js/utils/convertcsv.js";
import path from "path";
import sqlite3 from "sqlite3";
import DbHandlers from "./src/serverless-side/database/config.js";

// db
const dbPath = path.join(
  app.getAppPath(),
  "src",
  "serverless-side",
  "database",
  "myapps.db"
);
const db = new sqlite3.Database(dbPath);
DbHandlers(ipcMain, db);

// export-csv
convertCSV(ipcMain, dialog, fs, path, app);

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload.js"),
      contextIsolation: true,
    },
    frame: false,
  });
  mainWindow.loadFile(path.join(app.getAppPath(), "index.html"));
  // Menonaktifkan pintasan keyboard untuk membuka DevTools
  // mainWindow.webContents.on("before-input-event", (event, input) => {
  //   if (
  //     (input.control && input.shift && input.key === "I") || // Ctrl+Shift+I
  //     input.key === "F12" // F12
  //   ) {
  //     event.preventDefault(); // Mencegah pintasan keyboard ini
  //   }
  // });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
ipcMain.handle("show-save-dialog", async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});
// close apps
ipcMain.on("close-apps", () => {
  app.quit();
});
// logout apps
ipcMain.on("logout-apps", () => {
  mainWindow.loadFile(path.join(app.getAppPath(), "index.html"));
});
// navigate page
let currentPage = "dashboard";
ipcMain.on("navigate", (event, page) => {
  currentPage = page;
  mainWindow.loadFile(
    path.join(app.getAppPath(), "src", "client-side", "pages", `${page}.html`)
  );
});
// minimze
ipcMain.on("minimize-apps", () => {
  mainWindow.minimize();
});
// restore
ipcMain.on("restore-apps", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
