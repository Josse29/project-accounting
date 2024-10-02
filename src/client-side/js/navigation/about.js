import {
  sendIpcHideAbout,
  sendIpcLoadDashboard,
  sendIpcLoadInventory,
  sendIpcLoadOrder,
  sendIpcLoadTransaksi,
  sendIpcLoadUser,
} from "../utils/ipc.js";

$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:about-page");
  });
$("#close-about")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:about-page");
  });
$("#dashboardWindowAbout")
  .off("click")
  .on("click", () => {
    sendIpcLoadDashboard();
    sendIpcHideAbout();
  });
$("#orderWindowAbout")
  .off("click")
  .on("click", () => {
    sendIpcLoadOrder();
    sendIpcHideAbout();
  });
$("#inventoryWindowAbout")
  .off("click")
  .on("click", () => {
    sendIpcLoadInventory();
    sendIpcHideAbout();
  });
$("#transaksiWindowAbout")
  .off("click")
  .on("click", () => {
    sendIpcLoadTransaksi();
    sendIpcHideAbout();
  });
$("#usersWindowAbout")
  .off("click")
  .on("click", () => {
    sendIpcLoadUser();
    sendIpcHideAbout();
  });
