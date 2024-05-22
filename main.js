const {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  dialog,
} = require("electron/main");
const db = require("./src/config/database/db_config");
const remote = require("@electron/remote/main");
const fs = require("fs");
const path = require("path");
const url = require("url");
remote.initialize();
let loginPage;
let registerPage;
let dashboardPage;
let orderPage;
let itemPage;
let dataPage;
let usersPage;
let aboutPage;

const createLoginPage = () => {
  loginPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1100,
    height: 750,
    autoHideMenuBar: true,
  });
  loginPage.loadFile("index.html");
  db.serialize(() => {
    console.log("terhubung ke sqlite3...");
  });
  ipcMain.on("minimize-maximize-window:login-page", () => {
    if (loginPage.isMaximized()) {
      loginPage.unmaximize();
    } else {
      loginPage.maximize();
    }
  });
  ipcMain.on("minimize-window:login-page", () => {
    loginPage.minimize();
  });
  ipcMain.on("close-window:login-page", () => {
    app.quit();
  });
};
const createRegisterPage = () => {
  registerPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "Register - page",
    width: 450,
    height: 720,
    autoHideMenuBar: true,
  });
  registerPage.loadFile("./src/pages/register.html");
};
const createDashboardPage = () => {
  dashboardPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });
  dashboardPage.loadFile("src/pages/dashboard.html");
  dashboardPage.webContents.on("did-finish-load", () => {
    loginPage.hide();
  });
  remote.enable(dashboardPage.webContents);
  dashboardPage.setFullScreen(true);
  ipcMain.on("minimize-maximize-window:dashboard-page", () => {
    if (dashboardPage.isMaximized()) {
      dashboardPage.unmaximize();
    } else {
      dashboardPage.maximize();
    }
  });
  ipcMain.on("hide-window:dashboard-page", () => {
    dashboardPage.hide();
  });
  ipcMain.on("minimize-window:dashboard-page", () => {
    dashboardPage.minimize();
  });
  ipcMain.on("close-window:dashboard-page", () => {
    dashboardPage.hide();
    loginPage.show();
  });
};
const createOrderPage = () => {
  orderPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  orderPage.setFullScreen(true);
  orderPage.loadFile("src/pages/order.html");
  remote.enable(orderPage.webContents);
  // orderPage.webContents.on("did-finish-load", () => {
  //   dashboardPage.hide();
  //   loginPage.hide();
  // });
  ipcMain.on("minimize-window:order-page", () => {
    orderPage.minimize();
  });
  ipcMain.on("hide-window:order-page", () => {
    orderPage.hide();
  });
  ipcMain.on("close-window:order-page", () => {
    orderPage.hide();
    loginPage.show();
  });
};
const createItemPage = () => {
  itemPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  itemPage.setFullScreen(true);
  itemPage.loadFile("src/pages/item.html");
  remote.enable(itemPage.webContents);
  ipcMain.on("minimize-window:item-page", () => {
    itemPage.minimize();
  });
  ipcMain.on("hide-window:item-page", () => {
    itemPage.hide();
  });
  ipcMain.on("close-window:item-page", () => {
    itemPage.hide();
    loginPage.show();
  });
};
const createDataPage = () => {
  dataPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  dataPage.setFullScreen(true);
  dataPage.loadFile("src/pages/data.html");
  remote.enable(dataPage.webContents);
  ipcMain.on("minimize-window:data-page", () => {
    dataPage.minimize();
  });
  ipcMain.on("hide-window:data-page", () => {
    dataPage.hide();
  });
  ipcMain.on("close-window:data-page", () => {
    dataPage.hide();
    loginPage.show();
  });
};
const createUsersPage = () => {
  usersPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  usersPage.setFullScreen(true);
  usersPage.loadFile("src/pages/users.html");
  remote.usersPage(usersPage.webContents);
  ipcMain.on("minimize-window:users-page", () => {
    usersPage.minimize();
  });
  ipcMain.on("hide-window:users-page", () => {
    usersPage.hide();
  });
  ipcMain.on("close-window:users-page", () => {
    usersPage.hide();
    loginPage.show();
  });
};
const createAboutPage = () => {
  aboutPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  aboutPage.setFullScreen(true);
  aboutPage.loadFile("src/pages/about-us.html");
  ipcMain.on("minimize-window:about-page", () => {
    aboutPage.minimize();
  });
  ipcMain.on("hide-window:about-page", () => {
    aboutPage.hide();
  });
  ipcMain.on("close-window:about-page", () => {
    aboutPage.hide();
    loginPage.show();
  });
};
// start ipc load-page
ipcMain.on("load:register-page", () => {
  createRegisterPage();
});
ipcMain.on("load:dashboard-page", () => {
  createDashboardPage();
});
ipcMain.on("load:order-page", () => {
  createOrderPage();
});
ipcMain.on("load:item-page", () => {
  createItemPage();
});
ipcMain.on("load:data-page", () => {
  createDataPage();
});
ipcMain.on("load:users-page", () => {
  createUsersPage();
});
ipcMain.on("load:about-page", () => {
  createAboutPage();
});
// end ipc load-page
let productPDF;
ipcMain.on("pdf:product", (event, thead, tbody, file_path) => {
  productPDF = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
  });
  remote.enable(productPDF.webContents);
  productPDF.loadFile("src/pdf/product.html");
  productPDF.webContents.on("dom-ready", () => {
    productPDF.webContents.send("tables:product", thead, tbody, file_path);
  });
  ipcMain.on("create:pdf-product", (event, file_path) => {
    productPDF.webContents
      .printToPDF({
        marginsType: 0,
        printBackground: true,
        printSelectionOnly: false,
        landscape: true,
      })
      .then((data) => {
        fs.writeFile(file_path, data, (err) => {
          if (err) throw err;
          dialog.showMessageBoxSync({
            title: "Alert",
            type: "info",
            message: "Successfully export data to PDF",
          });
          console.log(file_path);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
let productPrint
ipcMain.on("print:product", (event, thead, tbody) => {
  productPrint = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
  });
  remote.enable(productPrint.webContents);
  productPrint.loadFile("src/print/product.html");
  productPrint.webContents.on("dom-ready", () => {
    productPrint.webContents.send("tables:product", thead, tbody);
  });
  ipcMain.on("create:print-product", (event) => {
    productPrint.webContents.print({
      printBackground: true
    }, () => {
      productPrint.close()
    })
    productPrint.on('close', () => {
      productPrint = null
    })
  });
});

app.whenReady().then(() => {
  createLoginPage();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createLoginPage();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
