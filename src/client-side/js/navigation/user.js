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
