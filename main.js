const { app, BrowserWindow, ipcMain } = require("electron");
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Set preload script
      nodeIntegration: true, // Enable Node.js integration for renderer process
    },
  });
  // Load halaman pertama (page1.html)
  mainWindow.loadFile(path.join(__dirname, "page1.html"));

  // Close event listener
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};
// IPC event to navigate to page 2
ipcMain.on("navigate-to-page2", () => {
  mainWindow.loadFile(path.join(__dirname, "page2.html"));
});
// IPC event to navigate to page 1
ipcMain.on("navigate-to-page1", () => {
  mainWindow.loadFile(path.join(__dirname, "page1.html"));
});

// Initialize the app and create window when ready
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
