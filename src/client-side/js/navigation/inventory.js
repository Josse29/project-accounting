$("#minimize-maximize-window-inventory").on("click", () => {
  ipcRenderer.send("minimize-maximize-window:inventory-page");
});
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
