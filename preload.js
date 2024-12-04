// import { contextBridge, ipcRenderer } from "electron"; // es6
const { contextBridge, ipcRenderer } = require("electron"); // CommonJS
contextBridge.exposeInMainWorld("electronAPI", {
  savePDF: (data) => ipcRenderer.invoke("save-pdf", data),
  lodashAPI: {
    findIndex: (...args) => ipcRenderer.invoke("lodash-findIndex", ...args),
    last: (array) => ipcRenderer.invoke("lodash-last", array),
  },
  saveCSV: (data) => ipcRenderer.invoke("save-csv", data),
  sqliteApi: {
    all: (...args) => ipcRenderer.invoke("db-all", ...args),
    run: (...args) => ipcRenderer.invoke("db-run", ...args),
    get: (...args) => ipcRenderer.invoke("db-get", ...args),
    each: (...args) => ipcRenderer.invoke("db-each", ...args),
    each1: (...args) => ipcRenderer.invoke("db-each-1", ...args),
  },
  navigateTo: (file) => ipcRenderer.send("navigate", file),
  logout: () => ipcRenderer.send("logout-apps"),
  close: () => ipcRenderer.send("close-apps"),
  minimize: () => ipcRenderer.send("minimize-apps"),
  restore: () => ipcRenderer.send("restore-apps"),
});
