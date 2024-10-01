// register
export const sendIpcLoadRegister = () => {
  ipcRenderer.send("load:register-page");
};
// 1.dashboard
export const sendIpcLoadDashboard = () => {
  ipcRenderer.send("load:dashboard-page");
};
export const sendIpcHideDash = () => {
  ipcRenderer.send("hide-window:dashboard-page");
};
// 2 order
export const sendIpcLoadOrder = () => {
  ipcRenderer.send("load:order-page");
};
export const sendIpcHideOrder = () => {
  ipcRenderer.send("hide-window:order-page");
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
