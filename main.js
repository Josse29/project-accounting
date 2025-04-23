import { app, BrowserWindow, dialog, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import convertCSV from "./src/client-side/js/utils/convertCSV.js";
import convertPDF from "./src/client-side/js/utils/convertPDF.js";
import {
  Accounting,
  Product,
  Stock,
  User,
} from "./src/serverless-side/index.js";
let mainWindow;
function createWindow() {
  const appPath = (...paths) => {
    return path.join(app.getAppPath(), ...paths);
  };
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    // fullscreen: true,
    webPreferences: {
      preload: path.join(appPath("preload.js")),
      contextIsolation: true,
    },
    frame: false,
  });
  // production
  // mainWindow.loadFile(appPath("index.html"));
  // development
  mainWindow.loadURL("http://localhost:5173/");
  // db
  const dbPath = appPath("src", "serverless-side", "database", "myapps.db");
  const db = new sqlite3.Database(dbPath);
  // Product(ipcMain, db);
  User(ipcMain, db);
  Product(ipcMain, db);
  Stock(ipcMain, db);
  Accounting(ipcMain, db);
  // export-csv
  convertCSV(ipcMain, dialog, fs, appPath);
  // convertpdf
  convertPDF(ipcMain, BrowserWindow, dialog, fs, appPath);
  // close apps
  ipcMain.on("close-apps", () => {
    app.quit();
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
