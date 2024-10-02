import {
  sendIpcHideUser,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadInventory,
  sendIpcLoadOrder,
  sendIpcLoadTransaksi,
} from "../utils/ipc.js";

$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:user-page");
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("restore-window:user-page");
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("close-window:user-page");
  });
$("#dashboardWindowUsers")
  .off("click")
  .on("click", () => {
    sendIpcLoadDashboard();
    sendIpcHideUser();
  });
$("#orderWindowUsers")
  .off("click")
  .on("click", () => {
    sendIpcLoadOrder();
    sendIpcHideUser();
  });
$("#inventoryWindowUsers")
  .off("click")
  .on("click", () => {
    sendIpcLoadInventory();
    sendIpcHideUser();
  });
$("#transaksiWindowUsers")
  .off("click")
  .on("click", () => {
    sendIpcLoadTransaksi();
    sendIpcHideUser();
  });
$("#aboutWindowUsers")
  .off("click")
  .on("click", () => {
    sendIpcLoadAbout();
    sendIpcHideUser();
  });
