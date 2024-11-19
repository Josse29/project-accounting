// import { contextBridge, ipcRenderer } from "electron"; // es6

const { contextBridge, ipcRenderer } = require("electron"); // CommonJS
contextBridge.exposeInMainWorld("electronAPI", {
  myDbSql: () => ipcRenderer.invoke("db-apps"),
  showSaveDialog: (options) => ipcRenderer.invoke("show-save-dialog", options),
  navigateTo: (file) => ipcRenderer.send("navigate", file),
  logout: () => ipcRenderer.send("logout-apps"),
  close: () => ipcRenderer.send("close-apps"),
  minimize: () => ipcRenderer.send("minimize-apps"),
  restore: () => ipcRenderer.send("restore-apps"),
  getCurrentPage: () => ipcRenderer.invoke("get-current-page"),
});
