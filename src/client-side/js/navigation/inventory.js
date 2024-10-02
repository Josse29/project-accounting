import {
  sendIpcHideInventory,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadOrder,
  sendIpcLoadTransaksi,
  sendIpcLoadUser,
} from "../utils/ipc.js";

$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:inventory-page");
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("restore-window:inventory-page");
  });
$("#close-window").on("click", () => {
  ipcRenderer.send("close-window:inventory-page");
});
$("#dashboardWindowInventory")
  .off("click")
  .on("click", () => {
    sendIpcLoadDashboard();
    sendIpcHideInventory();
  });
$("#orderWindowInventory")
  .off("click")
  .on("click", () => {
    sendIpcLoadOrder();
    sendIpcHideInventory();
  });
$("#transaksiWindowInventory")
  .off("click")
  .on("click", () => {
    sendIpcLoadTransaksi();
    sendIpcHideInventory();
  });
$("#usersWindowInventory")
  .off("click")
  .on("click", () => {
    sendIpcLoadUser();
    sendIpcHideInventory();
  });
$("#aboutWindowInventory")
  .off("click")
  .on("click", () => {
    sendIpcLoadAbout();
    sendIpcHideInventory();
  });
