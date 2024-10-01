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
