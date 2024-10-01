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
