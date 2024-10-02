import {
  sendIpcHideDash,
  sendIpcLoadAbout,
  sendIpcLoadInventory,
  sendIpcLoadOrder,
  sendIpcLoadTransaksi,
  sendIpcLoadUser,
} from "../utils/ipc.js";

// top
$("#restore-window")
  .off("click")
  .on("click", () => {
    console.log("Restore window clicked");
    ipcRenderer.send("restore-window:dashboard-page");
  });
$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:dashboard-page");
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("close-window:dashboard-page");
  });
// side
$("#orderWindow")
  .off("click")
  .on("click", () => {
    sendIpcLoadOrder();
    sendIpcHideDash();
  });
$("#inventoryWindow")
  .off("click")
  .on("click", () => {
    sendIpcLoadInventory();
    sendIpcHideDash();
  });
$("#transaksiWindow")
  .off("click")
  .on("click", () => {
    sendIpcLoadTransaksi();
    sendIpcHideDash();
  });
$("#usersWindow")
  .off("click")
  .on("click", () => {
    sendIpcLoadUser();
    sendIpcHideDash();
  });
$("#aboutWindow")
  .off("click")
  .on("click", () => {
    sendIpcLoadAbout();
    sendIpcHideDash();
  });
