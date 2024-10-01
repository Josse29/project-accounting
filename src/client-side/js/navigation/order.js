import {
  sendIpcHideOrder,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadInventory,
  sendIpcLoadTransaksi,
  sendIpcLoadUsers,
} from "../utils/ipc.js";

$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:order-page");
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("restore-window:order-page");
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("close-window:order-page");
  });
$("#dashboardWindowOrder")
  .off("click")
  .on("click", () => {
    sendIpcLoadDashboard();
    sendIpcHideOrder();
  });
$("#inventoryWindowOrder")
  .off("click")
  .on("click", () => {
    sendIpcLoadInventory();
    sendIpcHideOrder();
  });
$("#transaksiWindowOrder")
  .off("click")
  .on("click", () => {
    sendIpcLoadTransaksi();
    sendIpcHideOrder();
  });
$("#usersWindowOrder")
  .off("click")
  .on("click", () => {
    sendIpcLoadUsers();
    sendIpcHideOrder();
  });
$("#aboutWindowOrder")
  .off("click")
  .on("click", () => {
    sendIpcLoadAbout();
    sendIpcHideOrder();
  });
