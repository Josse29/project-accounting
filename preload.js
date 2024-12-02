// import { contextBridge, ipcRenderer } from "electron"; // es6

const { contextBridge, ipcRenderer } = require("electron"); // CommonJS
contextBridge.exposeInMainWorld("electronAPI", {
  saveCSV: (data) => ipcRenderer.invoke("save-csv", data),
  myDbSql: () => ipcRenderer.invoke("db-apps"),
  showSaveDialog: (options) => ipcRenderer.invoke("show-save-dialog", options),
  navigateTo: (file) => ipcRenderer.send("navigate", file),
  logout: () => ipcRenderer.send("logout-apps"),
  close: () => ipcRenderer.send("close-apps"),
  minimize: () => ipcRenderer.send("minimize-apps"),
  restore: () => ipcRenderer.send("restore-apps"),
  sqliteApi: {
    all: (...args) => ipcRenderer.invoke("db-all", ...args),
    run: (...args) => ipcRenderer.invoke("db-run", ...args),
    get: (...args) => ipcRenderer.invoke("db-get", ...args),
    each: (...args) => ipcRenderer.invoke("db-each", ...args),
    each1: (...args) => ipcRenderer.invoke("db-each-1", ...args),
  },
});
