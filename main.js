import { app, BrowserWindow, dialog, ipcMain } from "electron";
import fs from "fs";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";
import convertCSV from "./src/serverless-side/utils/convertcsv.js";
import convertPDF from "./src/serverless-side/utils/convertpdf/index.js";
import {
  Accounting,
  Product,
  Stock,
  User,
} from "./src/serverless-side/index.js";
import Company from "./src/serverless-side/models/company/controller.js";
import bcryptjs from "bcryptjs";
import path from "path";
const isDev = !app.isPackaged;
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
    icon: path.join(appPath("jossstackico.ico")),
  });
  // development
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173/");
  } else {
    mainWindow.loadFile(appPath("src", "client-side", "index.html"));
  }
  // db
  const userDataPath = app.getPath("userData");
  // console.log(userDataPath); C:\Users\ASUS\AppData\Roaming\josstack
  const dbDestination = path.join(userDataPath, "myapps.db");
  const db = new sqlite3.Database(dbDestination);
  User(ipcMain, db, bcryptjs, jwt);
  Product(ipcMain, db);
  Stock(ipcMain, db);
  Accounting(ipcMain, db);
  Company(ipcMain, db);
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
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on("before-input-event", (event, input) => {
      if (
        (input.control && input.shift && input.key.toUpperCase() === "I") ||
        input.key === "F12"
      ) {
        event.preventDefault();
      }
    });
    mainWindow.webContents.on("context-menu", (e) => {
      e.preventDefault();
    });
  }
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
