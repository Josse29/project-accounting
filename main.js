const { app, BrowserWindow, ipcMain } = require("electron/main");
const db = require("./src/client-side/config/db");
const remote = require("@electron/remote/main");
const fs = require("fs");
remote.initialize();
// all-pages
let loginPage;
let registerPage;
let dashboardPage;
let orderPage;
let inventoryPage;
let transaksiPage;
let usersPage;
let aboutPage;
// 1 loginpage
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
// 2 register page
ipcMain.on("load:register-page", () => {
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
  registerPage.loadFile("./src/client-side/pages/register.html");
  remote.enable(registerPage.webContents);
});
// 3 dashboard page
ipcMain.on("load:dashboard-page", () => {
  dashboardPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });
  dashboardPage.loadFile("./src/client-side/pages/dashboard.html");
  dashboardPage.webContents.on("did-finish-load", () => {
    loginPage.hide();
  });
  remote.enable(dashboardPage.webContents);
  dashboardPage.setFullScreen(true);
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
});
// 4 order page
ipcMain.on("load:order-page", () => {
  orderPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
    autoHideMenuBar: true,
  });
  orderPage.setFullScreen(true);
  orderPage.loadFile("./src/client-side/pages/order.html");
  remote.enable(orderPage.webContents);
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
});
// 5 inventory page
ipcMain.on("load:inventory-page", () => {
  inventoryPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
  });
  // inventoryPage.setFullScreen(true);
  inventoryPage.loadFile("./src/client-side/pages/inventory.html");
  remote.enable(inventoryPage.webContents);
  ipcMain.on("minimize-maximize-window:inventory-page", () => {
    if (inventoryPage.isMaximized()) {
      inventoryPage.unmaximize();
    } else {
      inventoryPage.maximize();
    }
  });
  ipcMain.on("minimize-window:inventory-page", () => {
    inventoryPage.minimize();
  });
  ipcMain.on("hide-window:inventory-page", () => {
    inventoryPage.hide();
  });
  ipcMain.on("close-window:inventory-page", () => {
    inventoryPage.hide();
    loginPage.show();
  });
});
// 6 transaksi page
ipcMain.on("load:transaksi-page", () => {
  transaksiPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  transaksiPage.setFullScreen(true);
  transaksiPage.loadFile("./src/client-side/pages/transaksi.html");
  remote.enable(transaksiPage.webContents);
  ipcMain.on("minimize-window:transaksi-page", () => {
    transaksiPage.minimize();
  });
  ipcMain.on("hide-window:transaksi-page", () => {
    transaksiPage.hide();
  });
  ipcMain.on("close-window:transaksi-page", () => {
    transaksiPage.hide();
    loginPage.show();
  });
});
// 7 users pages
ipcMain.on("load:users-page", () => {
  usersPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });
  usersPage.setFullScreen(true);
  usersPage.loadFile("./src/client-side/pages/users.html");
  remote.enable(usersPage.webContents);
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
});
// 8 about page
ipcMain.on("load:about-page", () => {
  aboutPage = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
  });
  aboutPage.setFullScreen(true);
  aboutPage.loadFile("./src/client-side/pages/about-us.html");
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
});
// export-pdf
let productPDF;
let persediaanPdf;
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
let productPrint;
let persediaanPrint;
ipcMain.on("print:product", (event, tbody) => {
  productPrint = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
  });
  remote.enable(productPrint.webContents);
  productPrint.loadFile("./src/client-side/print/product.html");
  productPrint.webContents.on("dom-ready", () => {
    productPrint.webContents.send("tables:product", tbody);
  });
  ipcMain.on("create:print-product", (event) => {
    productPrint.webContents.print(
      {
        printBackground: true,
      },
      () => {
        productPrint.close();
      }
    );
    productPrint.on("close", () => {
      productPrint = null;
    });
  });
});
ipcMain.on(
  "print:persediaan",
  (
    event,
    tbodyProduct,
    tbodyCategoryGroup,
    tbodyProductGroup,
    tbodySupplierGroup,
    txtPersediaanQtySum,
    txtPersediaanRpSum
  ) => {
    persediaanPrint = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      // frame: false,
    });
    remote.enable(persediaanPrint.webContents);
    persediaanPrint.loadFile("./src/client-side/print/persediaan.html");
    persediaanPrint.webContents.on("dom-ready", () => {
      persediaanPrint.webContents.send(
        "tables:persediaan",
        tbodyProduct,
        tbodyCategoryGroup,
        tbodyProductGroup,
        tbodySupplierGroup,
        txtPersediaanQtySum,
        txtPersediaanRpSum
      );
    });
    ipcMain.on("create:print-persediaan", (event) => {
      persediaanPrint.webContents.print(
        {
          printBackground: true,
        },
        () => {
          persediaanPrint.close();
        }
      );
      persediaanPrint.on("close", () => {
        persediaanPrint = null;
      });
    });
  }
);
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
