import { app, BrowserWindow, dialog, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";

import DbHandlers from "./src/serverless-side/database/config.js";
import convertCSV from "./src/client-side/js/utils/convertCSV.js";
import convertPDF from "./src/client-side/js/utils/convertPDF.js";

let mainWindow;
function createWindow() {
  const appPath = (...paths) => {
    return path.join(app.getAppPath(), ...paths);
  };
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      preload: path.join(appPath("preload.js")),
      contextIsolation: true,
    },
    frame: false,
  });
  mainWindow.loadFile(appPath("index.html"));
  // db
  DbHandlers(ipcMain, appPath, sqlite3);
  // export-csv
  convertCSV(ipcMain, dialog, fs, appPath);
  // convertpdf
  convertPDF(ipcMain, BrowserWindow, dialog, fs, appPath);
  // close apps
  ipcMain.on("close-apps", () => {
    app.quit();
  });
  // logout apps
  ipcMain.on("logout-apps", () => {
    mainWindow.loadFile(appPath("index.html"));
  });
  // navigate page
  ipcMain.on("navigate", (event, page) => {
    mainWindow.loadFile(appPath("src", "client-side", "pages", `${page}.html`));
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
  // inactive devtools
  // mainWindow.webContents.on("before-input-event", (event, input) => {
  //   if (
  //     (input.control && input.shift && input.key === "I") || // Ctrl+Shift+I
  //     input.key === "F12" // F12
  //   ) {
  //     event.preventDefault(); // Mencegah pintasan keyboard ini
  //   }
  // });
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
