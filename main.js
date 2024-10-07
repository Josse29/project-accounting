const { app, BrowserWindow, ipcMain } = require("electron/main");
const db = require("./src/client-side/config/db");
const remote = require("@electron/remote/main");
const fs = require("fs");
remote.initialize();

// 1 loginpage
let loginPage;
const createLoginPage = () => {
  loginPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
  });
  loginPage.loadFile("index.html");
  remote.enable(loginPage.webContents);
  db.serialize(() => {
    console.log("terhubung ke sqlite3...");
  });
  // minimze
  ipcMain.on("minimize-window:login-page", () => {
    loginPage.minimize();
  });
  // restore
  ipcMain.on("restore-window:login-page", () => {
    if (loginPage.isMaximized()) {
      loginPage.unmaximize();
    } else {
      loginPage.maximize();
    }
  });
  // close
  ipcMain.on("close-window:login-page", () => {
    app.quit();
  });
};
// 2 dashboard page
let dashboardPage;
let isDashboardListenerSet = false; // Flag untuk listener dashboard
ipcMain.on("load:dashboard-page", () => {
  dashboardPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800,
    frame: false,
  });
  dashboardPage.loadFile("./src/client-side/pages/dashboard.html");
  dashboardPage.webContents.on("did-finish-load", () => {
    loginPage.hide();
  });
  remote.enable(dashboardPage.webContents);
  if (!isDashboardListenerSet) {
    // minimize page
    ipcMain.on("minimize-window:dashboard-page", () => {
      dashboardPage.minimize();
    });
    // restore page
    ipcMain.on("restore-window:dashboard-page", () => {
      if (dashboardPage.isMaximized()) {
        dashboardPage.unmaximize();
      } else {
        dashboardPage.maximize();
      }
    });
    // close page
    ipcMain.on("close-window:dashboard-page", () => {
      dashboardPage.hide();
      loginPage.show();
    });
    // hide page
    ipcMain.on("hide-window:dashboard-page", () => {
      dashboardPage.hide();
    });
    isDashboardListenerSet = true;
  }
});
// 3 order page
let orderPage;
let isOrderListenerSet = false;
ipcMain.on("load:order-page", () => {
  orderPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800,
    frame: false,
  });
  orderPage.loadFile("./src/client-side/pages/order.html");
  remote.enable(orderPage.webContents);
  if (!isOrderListenerSet) {
    // hide
    ipcMain.on("hide-window:order-page", () => {
      orderPage.hide();
    });
    // minimize
    ipcMain.on("minimize-window:order-page", () => {
      orderPage.minimize();
    });
    // restore page
    ipcMain.on("restore-window:order-page", () => {
      if (orderPage.isMaximized()) {
        orderPage.unmaximize();
      } else {
        orderPage.maximize();
      }
    });
    // close
    ipcMain.on("close-window:order-page", () => {
      orderPage.hide();
      loginPage.show();
    });
    isOrderListenerSet = true;
  }
});
// 4 inventory page
let inventoryPage;
let isInventoryListenerSet = false;
ipcMain.on("load:inventory-page", () => {
  inventoryPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800,
    frame: false,
  });
  // inventoryPage.setFullScreen(true);
  inventoryPage.loadFile("./src/client-side/pages/inventory.html");
  remote.enable(inventoryPage.webContents);
  if (!isInventoryListenerSet) {
    // minimize
    ipcMain.on("minimize-window:inventory-page", () => {
      inventoryPage.minimize();
    });
    // restore
    ipcMain.on("restore-window:inventory-page", () => {
      if (inventoryPage.isMaximized()) {
        inventoryPage.unmaximize();
      } else {
        inventoryPage.maximize();
      }
    });
    // close
    ipcMain.on("close-window:inventory-page", () => {
      inventoryPage.hide();
      loginPage.show();
    });
    // hide
    ipcMain.on("hide-window:inventory-page", () => {
      inventoryPage.hide();
    });
    isInventoryListenerSet = true;
  }
});
// 5 transaksi page
let transaksiPage;
let isTransactionListenerSet = false;
ipcMain.on("load:transaksi-page", () => {
  transaksiPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800,
    frame: false,
  });
  transaksiPage.loadFile("./src/client-side/pages/transaksi.html");
  remote.enable(transaksiPage.webContents);
  if (!isTransactionListenerSet) {
    // minimze
    ipcMain.on("minimize-window:transaksi-page", () => {
      transaksiPage.minimize();
    });
    // restore
    ipcMain.on("restore-window:transkasi-page", () => {
      if (transaksiPage.isMaximized()) {
        transaksiPage.unmaximize();
      } else {
        transaksiPage.maximize();
      }
    });
    // close
    ipcMain.on("close-window:transaksi-page", () => {
      transaksiPage.hide();
      loginPage.show();
    });
    // hide only
    ipcMain.on("hide-window:transaksi-page", () => {
      transaksiPage.hide();
    });
    isTransactionListenerSet = true;
  }
});
// 6 users pages
let userPage;
let isUserListenerSet = false;
ipcMain.on("load:users-page", () => {
  userPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800,
    frame: false,
  });
  userPage.loadFile("./src/client-side/pages/users.html");
  remote.enable(userPage.webContents);
  if (!isUserListenerSet) {
    // minimize
    ipcMain.on("minimize-window:user-page", () => {
      userPage.minimize();
    });
    // restore
    ipcMain.on("restore-window:user-page", () => {
      if (userPage.isMaximized()) {
        userPage.unmaximize();
      } else {
        userPage.maximize();
      }
    });
    // close
    ipcMain.on("close-window:user-page", () => {
      userPage.hide();
      loginPage.show();
    });
    // hide only
    ipcMain.on("hide-window:user-page", () => {
      userPage.hide();
    });
    isUserListenerSet = true;
  }
});
// 8 about page
let aboutPage;
let isAboutListenerSet = false;
ipcMain.on("load:about-page", () => {
  aboutPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800,
    frame: false,
  });
  aboutPage.loadFile("./src/client-side/pages/about-us.html");
  if (!isAboutListenerSet) {
    // minimize
    ipcMain.on("minimize-window:about-page", () => {
      aboutPage.minimize();
    });
    // restore
    ipcMain.on("restore-window:about-page", () => {
      if (aboutPage.isMaximized()) {
        aboutPage.unmaximize();
      } else {
        aboutPage.maximize();
      }
    });
    // close
    ipcMain.on("close-window:about-page", () => {
      aboutPage.hide();
      loginPage.show();
    });
    // hide
    ipcMain.on("hide-window:about-page", () => {
      aboutPage.hide();
    });
    isAboutListenerSet = true;
  }
});
// export-pdf
let productPDF;
let persediaanPdf;
let salesPDF;
ipcMain.on("pdf:product", (event, tbody, file_path) => {
  productPDF = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
  });
  remote.enable(productPDF.webContents);
  productPDF.loadFile("./src/client-side/pdf/product.html");
  productPDF.webContents.on("dom-ready", () => {
    productPDF.webContents.send("tables:product", tbody, file_path);
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
          productPDF.close();
          inventoryPage.webContents.send("success:pdf-product", file_path);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
ipcMain.on(
  "pdf:persediaan",
  (
    event,
    tbodyProduct,
    tbodyCategoryGroup,
    txtSumCategory,
    tbodyProductGroup,
    tbodySupplierGroup,
    txtSumSupplier,
    txtPersediaanQtySum,
    txtPersediaanRpSum,
    file_path
  ) => {
    persediaanPdf = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      // frame: false,
    });
    remote.enable(persediaanPdf.webContents);
    persediaanPdf.loadFile("./src/client-side/pdf/persediaan.html");
    persediaanPdf.webContents.on("dom-ready", () => {
      persediaanPdf.webContents.send(
        "tables:persediaan",
        tbodyProduct,
        tbodyCategoryGroup,
        txtSumCategory,
        tbodyProductGroup,
        tbodySupplierGroup,
        txtSumSupplier,
        txtPersediaanQtySum,
        txtPersediaanRpSum,
        file_path
      );
    });
    ipcMain.on("create:pdf-persediaan", (event, file_path) => {
      persediaanPdf.webContents
        .printToPDF({
          marginsType: 0,
          printBackground: true,
          printSelectionOnly: false,
          landscape: true,
        })
        .then((data) => {
          fs.writeFile(file_path, data, (err) => {
            if (err) throw err;
            persediaanPdf.close();
            inventoryPage.webContents.send("success:pdf-persediaan", file_path);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
);
ipcMain.on("pdf:sales", (event, tbodySales, file_path) => {
  salesPDF = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
  });
  remote.enable(salesPDF.webContents);
  salesPDF.loadFile("./src/client-side/pdf/sales.html");
  salesPDF.webContents.on("dom-ready", () => {
    salesPDF.webContents.send("tables:sales", tbodySales, file_path);
  });
  ipcMain.on("create:pdf-sales", (event, file_path) => {
    salesPDF.webContents
      .printToPDF({
        marginsType: 0,
        printBackground: true,
        printSelectionOnly: false,
        landscape: true,
      })
      .then((data) => {
        fs.writeFile(file_path, data, (err) => {
          if (err) throw err;
          salesPDF.close();
          orderPage.webContents.send("success:pdf-sales", file_path);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
// read-apps
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
