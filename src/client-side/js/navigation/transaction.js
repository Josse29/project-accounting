import {
  sendIpcLoadDashboard,
  sendIpcHideTransaction,
  sendIpcLoadOrder,
  sendIpcLoadInventory,
  sendIpcLoadUser,
  sendIpcLoadAbout,
} from "../utils/ipc.js";

$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:transaksi-page");
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("restore-window:transkasi-page");
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("close-window:transaksi-page");
  });
$("#dashboardWindowTransaction")
  .off("click")
  .on("click", () => {
    sendIpcLoadDashboard();
    sendIpcHideTransaction();
  });
$("#orderWindowTransaction")
  .off("click")
  .on("click", () => {
    sendIpcLoadOrder();
    sendIpcHideTransaction();
  });
$("#inventoryWindowTransaction")
  .off("click")
  .on("click", () => {
    sendIpcLoadInventory();
    sendIpcHideTransaction();
  });
$("#usersWindowTransaction")
  .off("click")
  .on("click", () => {
    sendIpcLoadUser();
    sendIpcHideTransaction();
  });
$("#aboutWindowTransaction")
  .off("click")
  .on("click", () => {
    sendIpcLoadAbout();
    sendIpcHideTransaction();
  });
