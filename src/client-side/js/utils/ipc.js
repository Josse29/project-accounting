// login page
$("#minimize-login").on("click", () => {
  ipcRenderer.send("minimize-window:login-page");
});
$("#min-max-login").on("click", () => {
  ipcRenderer.send("minimize-maximize-window:login-page");
});
$("#close-login").on("click", () => {
  ipcRenderer.send("close-window:login-page");
});
$(".register").on("click", () => {
  ipcRenderer.send("load:register-page");
});
$("#login").on("click", () => {
  ipcRenderer.send("load:dashboard-page");
});

// dashboard page
$("#minimize-dashboard").on("click", () => {
  sendIpcMinDash();
});
$("#close-dashboard").on("click", () => {
  sendIpcCloseDash();
});
$("#orderWindow").on("click", () => {
  sendIpcLoadOrder();
  sendIpcHideDash();
});
$("#inventoryWindow").on("click", () => {
  sendIpcLoadInventory();
  sendIpcHideDash();
});
$("#transaksiWindow").on("click", () => {
  sendIpcLoadTransaksi();
  sendIpcHideDash();
});
$("#usersWindow").on("click", () => {
  sendIpcLoadUsers();
  sendIpcHideDash();
});
$("#aboutWindow").on("click", () => {
  sendIpcLoadAbout();
  sendIpcHideDash();
});

// order page
$("#minimize-window-order").on("click", () => {
  sendIpcMinimizeWindowOrder();
});
$("#close-window-order").on("click", () => {
  sendIpcCloseWindowOrder();
});
$("#dashboardWindowOrder").on("click", () => {
  sendIpcLoadDashboard();
  sendIpcHideOrder();
});
$("#inventoryWindowOrder").on("click", () => {
  sendIpcLoadInventory();
  sendIpcHideOrder();
});
$("#transaksiWindowOrder").on("click", () => {
  sendIpcLoadTransaksi();
  sendIpcHideOrder();
});
$("#usersWindowOrder").on("click", () => {
  sendIpcLoadUsers();
  sendIpcHideOrder();
});
$("#aboutWindowOrder").on("click", () => {
  sendIpcLoadAbout();
  sendIpcHideOrder();
});

// inventory page
$("#minimize-window-inventory").on("click", () => {
  sendIpcMinimizeWindowInventory();
});
$("#close-window-inventory").on("click", () => {
  sendIpcCloseWindowInventory();
});
$("#dashboardWindowInventory").on("click", () => {
  sendIpcLoadDashboard();
  sendIpcHideInventory();
});
$("#orderWindowInventory").on("click", () => {
  sendIpcLoadOrder();
  sendIpcHideInventory();
});
$("#transaksiWindowInventory").on("click", () => {
  sendIpcLoadTransaksi();
  sendIpcHideInventory();
});
$("#usersWindowInventory").on("click", () => {
  sendIpcLoadUsers();
  sendIpcHideInventory();
});
$("#aboutWindowInventory").on("click", () => {
  sendIpcLoadAbout();
  sendIpcHideInventory();
});

// transaction page
$("#minimize-transaction").on("click", () => {
  sendIpcMinimizeWindowTransaction();
});
$("#close-transaction").on("click", () => {
  sendIpcCloseWindowTransaction();
});
$("#dashboardWindowTransaction").on("click", () => {
  sendIpcLoadDashboard();
  sendIpcHideTransaction();
});
$("#orderWindowTransaction").on("click", () => {
  sendIpcLoadOrder();
  sendIpcHideTransaction();
});
$("#inventoryWindowTransaction").on("click", () => {
  sendIpcLoadInventory();
  sendIpcHideTransaction();
});
$("#usersWindowTransaction").on("click", () => {
  sendIpcLoadUsers();
  sendIpcHideTransaction();
});
$("#aboutWindowTransaction").on("click", () => {
  sendIpcLoadAbout();
  sendIpcHideTransaction();
});

// users-page
$("#minimize-users").on("click", () => {
  sendIpcMinimizeWindowUsers();
});
$("#close-users").on("click", () => {
  sendIpcCloseWindowUsers();
});
$("#dashboardWindowUsers").on("click", () => {
  sendIpcLoadDashboard();
  sendIpcHideUsers();
});
$("#orderWindowUsers").on("click", () => {
  sendIpcLoadOrder();
  sendIpcHideUsers();
});
$("#inventoryWindowUsers").on("click", () => {
  sendIpcLoadInventory();
  sendIpcHideUsers();
});
$("#transaksiWindowUsers").on("click", () => {
  sendIpcLoadTransaksi();
  sendIpcHideUsers();
});
$("#aboutWindowUsers").on("click", () => {
  sendIpcLoadAbout();
  sendIpcHideUsers();
});

// about=page
$("#minimize-about").on("click", () => {
  sendIpcMinimizeWindowAbout();
});
$("#close-about").on("click", () => {
  sendIpcCloseWindowAbout();
});
$("#dashboardWindowAbout").on("click", () => {
  sendIpcLoadDashboard();
  sendIpcHideAbout();
});
$("#orderWindowAbout").on("click", () => {
  sendIpcLoadOrder();
  sendIpcHideAbout();
});
$("#inventoryWindowAbout").on("click", () => {
  sendIpcLoadInventory();
  sendIpcHideAbout();
});
$("#transaksiWindowAbout").on("click", () => {
  sendIpcLoadTransaksi();
  sendIpcHideAbout();
});
$("#usersWindowAbout").on("click", () => {
  sendIpcLoadUsers();
  sendIpcHideAbout();
});

// load-all-pages
// 1.dashboard
export const sendIpcLoadDashboard = () => {
  ipcRenderer.send("load:dashboard-page");
};
export const sendIpcCloseDash = () => {
  ipcRenderer.send("close-window:dashboard-page");
};
export const sendIpcHideDash = () => {
  ipcRenderer.send("hide-window:dashboard-page");
};
export const sendIpcMinDash = () => {
  ipcRenderer.send("minimize-window:dashboard-page");
};
export const sendIpcLoadRegister = () => {
  ipcRenderer.send("load:register-page");
};
// 2 order
export const sendIpcLoadOrder = () => {
  ipcRenderer.send("load:order-page");
};
export const sendIpcMinimizeWindowOrder = () => {
  ipcRenderer.send("minimize-window:order-page");
};
export const sendIpcHideOrder = () => {
  ipcRenderer.send("hide-window:order-page");
};
export const sendIpcCloseWindowOrder = () => {
  ipcRenderer.send("close-window:order-page");
};
// 3 inventory
export const sendIpcLoadInventory = () => {
  ipcRenderer.send("load:inventory-page");
};
export const sendIpcMinimizeWindowInventory = () => {
  ipcRenderer.send("minimize-window:inventory-page");
};
export const sendIpcHideInventory = () => {
  ipcRenderer.send("hide-window:inventory-page");
};
export const sendIpcCloseWindowInventory = () => {
  ipcRenderer.send("close-window:inventory-page");
};
// 4 transaksi
export const sendIpcLoadTransaksi = () => {
  ipcRenderer.send("load:transaksi-page");
};
export const sendIpcMinimizeWindowTransaction = () => {
  ipcRenderer.send("minimize-window:transaksi-page");
};
export const sendIpcHideTransaction = () => {
  ipcRenderer.send("hide-window:transaksi-page");
};
export const sendIpcCloseWindowTransaction = () => {
  ipcRenderer.send("close-window:transaksi-page");
};
// 5. users
export const sendIpcLoadUsers = () => {
  ipcRenderer.send("load:users-page");
};
export const sendIpcMinimizeWindowUsers = () => {
  ipcRenderer.send("minimize-window:users-page");
};
export const sendIpcHideUsers = () => {
  ipcRenderer.send("hide-window:users-page");
};
export const sendIpcCloseWindowUsers = () => {
  ipcRenderer.send("close-window:users-page");
};
// 6. about
export const sendIpcLoadAbout = () => {
  ipcRenderer.send("load:about-page");
};
export const sendIpcMinimizeWindowAbout = () => {
  ipcRenderer.send("minimize-window:about-page");
};
export const sendIpcHideAbout = () => {
  ipcRenderer.send("hide-window:about-page");
};
export const sendIpcCloseWindowAbout = () => {
  ipcRenderer.send("close-window:about-page");
};
// export-pdf
export const sendIpcLoadPDFProduct = () => {
  ipcRenderer.send("pdf:product");
};
