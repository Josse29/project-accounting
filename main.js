import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import sqlite3 from "sqlite3";
import getCategory from "./category.js";

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload.js"),
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
// get currentPage
ipcMain.handle("get-current-page", () => currentPage);
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
// db
const dbPath = path.join(
  app.getAppPath(),
  "src",
  "serverless-side",
  "database",
  "myapps.db"
);
const db = new sqlite3.Database(dbPath);
ipcMain.handle("db-apps", async () => {
  try {
    const categories = await getCategory(db); // Mendapatkan hasil query
    return categories; // Mengembalikan hasil ke renderer
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Kembalikan array kosong jika error
  }
});
