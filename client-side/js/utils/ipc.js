// login page
$("#minimize-login").on("click", () => {
    ipcRenderer.send("minimize-window:login-page")
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
    sendIpcMinDash()
})
$("#close-dashboard").on("click", () => {
    sendIpcCloseDash()
})
$("#orderWindow").on("click", () => {
    sendIpcLoadOrder()
    sendIpcHideDash()
})
$("#inventoryWindow").on("click", () => {
    sendIpcLoadInventory()
    sendIpcHideDash()
})
$("#transaksiWindow").on("click", () => {
    sendIpcLoadTransaksi()
    sendIpcHideDash()
})
$("#usersWindow").on("click", () => {
    sendIpcLoadUsers()
    sendIpcHideDash()
})
$("#aboutWindow").on("click", () => {
    sendIpcLoadAbout()
    sendIpcHideDash()
})
$("#close-dashboard").on("click", () => {
    ipcRenderer.send("close-window:dashboard-page");
})

// load-all-pages
export const sendIpcLoadRegister = () => {
    ipcRenderer.send("load:register-page");
};
export const sendIpcLoadDashboard = () => {
    ipcRenderer.send("load:dashboard-page");
};
export const sendIpcLoadOrder = () => {
    ipcRenderer.send("load:order-page");
};
export const sendIpcLoadInventory = () => {
    ipcRenderer.send("load:inventory-page");
};
export const sendIpcLoadTransaksi = () => {
    ipcRenderer.send("load:transaksi-page");
};
export const sendIpcLoadUsers = () => {
    ipcRenderer.send("load:users-page");
};
export const sendIpcLoadAbout = () => {
    ipcRenderer.send("load:about-page");
};
// export-pdf
export const sendIpcLoadPDFProduct = () => {
    ipcRenderer.send("pdf:product");
};

// dashboard
export const sendIpcCloseDash = () => {
    ipcRenderer.send("close-window:dashboard-page")
}
export const sendIpcHideDash = () => {
    ipcRenderer.send("hide-window:dashboard-page");
};
export const sendIpcMinDash = () => {
    ipcRenderer.send("minimize-window:dashboard-page");
};
// order pages
$("#minimize-window-order").on("click", () => {
    sendIpcMinimizeWindowOrder()
})
$("#close-window-order").on("click", () => {
    sendIpcCloseWindowOrder()
})
export const sendIpcMinimizeWindowOrder = () => {
    ipcRenderer.send("minimize-window:order-page");
};
export const sendIpcCloseWindowOrder = () => {
    ipcRenderer.send("close-window:order-page");
};

// inventory pages
export const sendIpcCloseWindowItem = () => {
    ipcRenderer.send("close-window:inventory-page");
};
export const sendIpcHideWindowItem = () => {
    ipcRenderer.send("hide-window:inventory-page");
};

// data pages
export const sendIpcMinWinData = () => {
    ipcRenderer.send("minimize-window:data-page");
};
export const sendIpcCloseWindowData = () => {
    ipcRenderer.send("close-window:data-page");
};
export const sendIpcHideWindowData = () => {
    ipcRenderer.send("hide-window:data-page");
};

// users pages
export const sendIpcMinWinUsers = () => {
    ipcRenderer.send("minimize-window:users-page");
};
export const sendIpcCloseWindowUsers = () => {
    ipcRenderer.send("close-window:users-page");
};
export const sendIpcHideWindowUsers = () => {
    ipcRenderer.send("hide-window:users-page");
};

// about pages
export const sendIpcMinWinAbout = () => {
    ipcRenderer.send("minimize-window:about-page");
};
export const sendIpcCloseWindowAbout = () => {
    ipcRenderer.send("close-window:about-page");
};
export const sendIpcHideWindowAbout = () => {
    ipcRenderer.send("hide-window:about-page");
};
