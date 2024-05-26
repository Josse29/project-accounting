// login page
export const sendIpcMinWinLogin = () => {
    ipcRenderer.send("minimize-window:login-page");
};
export const sendIpcMinMaxWinLogin = () => {
    ipcRenderer.send("minimize-maximize-window:login-page");
};
export const sendIpcCloseWindowLogin = () => {
    ipcRenderer.send("close-window:login-page");
};

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
export const sendIpcLoadItem = () => {
    ipcRenderer.send("load:item-page");
};
export const sendIpcLoadData = () => {
    ipcRenderer.send("load:data-page");
};
export const sendIpcLoadUsers = () => {
    ipcRenderer.send("load:users-page");
};
export const sendIpcLoadAbout = () => {
    ipcRenderer.send("load:about-page");
};
export const sendIpcLoadPDFProduct = () => {
    ipcRenderer.send("pdf:product");
};
// dashboard page
export const sendIpcMinWinDash = () => {
    ipcRenderer.send("minimize-window:dashboard-page");
};
export const sendIpcCloseWindowDash = () => {
    ipcRenderer.send("close-window:dashboard-page");
};
export const sendIpcHideDash = () => {
    ipcRenderer.send("hide-window:dashboard-page");
};
export const sendIpcMinMaxDash = () => {
    ipcRenderer.send("minimize-maximize-window:dashboard-page");
};

// order pages
export const sendIpcMinWinOrder = () => {
    ipcRenderer.send("minimize-window:order-page");
};
export const sendIpcCloseWindowOrder = () => {
    ipcRenderer.send("close-window:order-page");
};
export const sendIpcHideWindowOrder = () => {
    ipcRenderer.send("hide-window:order-page");
};

// items pages
export const sendIpcMinWinItems = () => {
    ipcRenderer.send("minimize-window:item-page");
};
export const sendIpcCloseWindowItem = () => {
    ipcRenderer.send("close-window:item-page");
};
export const sendIpcHideWindowItem = () => {
    ipcRenderer.send("hide-window:item-page");
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
