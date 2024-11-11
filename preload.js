const { contextBridge, ipcRenderer } = require("electron");

// Mengekspos API untuk navigasi antar halaman
contextBridge.exposeInMainWorld("electron", {
  navigateToPage2: () => ipcRenderer.send("navigate-to-page2"),
  navigateToPage1: () => ipcRenderer.send("navigate-to-page1"),
});
