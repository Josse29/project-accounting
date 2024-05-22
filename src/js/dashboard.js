import {
  sendIpcCloseWindowDash,
  sendIpcHideDash,
  sendIpcLoadAbout,
  sendIpcLoadData,
  sendIpcLoadItem,
  sendIpcLoadOrder,
  sendIpcLoadUsers,
  sendIpcMinWinDash,
} from "./ipc.js";

$("#minWindow").on("click", () => {
  sendIpcMinWinDash();
});
$("#closeWindow").on("click", () => {
  sendIpcCloseWindowDash();
});
$("#orderWindow").on("click", () => {
  sendIpcHideDash();
  sendIpcLoadOrder();
});
$("#itemWindow").on("click", () => {
  sendIpcHideDash();
  sendIpcLoadItem();
});
$("#dataWindow").on("click", () => {
  sendIpcHideDash();
  sendIpcLoadData();
});
$("#usersWindow").on("click", () => {
  sendIpcHideDash();
  sendIpcLoadUsers();
});
$("#aboutWindow").on("click", () => {
  sendIpcHideDash();
  sendIpcLoadAbout();
});
