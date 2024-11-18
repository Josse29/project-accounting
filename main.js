const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// import path ,{ dirname }  from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// close apps
ipcMain.on("quit-apps", () => {
  app.quit();
});
// logout apps
ipcMain.on("logout-apps", () => {
  mainWindow.loadFile(path.join(__dirname, "index.html"));
});
// navigate page
ipcMain.on("navigate", (event, page) => {
  mainWindow.loadFile(
    path.join(__dirname, "src", "client-side", "pages", `${page}.html`)
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
// ipcMain.on("trigger-alert", (event, { title, text }) => {
//   // Kirim kembali pesan ke renderer untuk menampilkan SweetAlert
//   event.sender.send("display-alert", { title, text });
// });
