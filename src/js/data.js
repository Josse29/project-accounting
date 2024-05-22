import {
  sendIpcCloseWindowData,
  sendIpcHideWindowData,
  sendIpcHideWindowOrder,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadItem,
  sendIpcLoadOrder,
  sendIpcLoadUsers,
  sendIpcMinWinData,
} from "./ipc.js";

$("#minWindow").on("click", () => {
  sendIpcMinWinData();
});
$("#closeWindow").on("click", () => {
  sendIpcCloseWindowData();
});
$("#dashboardWindow").on("click", () => {
  sendIpcHideWindowData();
  sendIpcLoadDashboard();
});
$("#orderWindow").on("click", () => {
  sendIpcHideWindowData();
  sendIpcLoadOrder();
});
$("#itemWindow").on("click", () => {
  sendIpcHideWindowData();
  sendIpcLoadItem();
});
$("#usersWindow").on("click", () => {
  sendIpcHideWindowData();
  sendIpcLoadUsers();
});
$("#aboutWindow").on("click", () => {
  sendIpcHideWindowOrder();
  sendIpcLoadAbout();
});
$(document).ready(function () {
  function updateTime() {
    const now = new Date();
    const optionsDMY = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsH = {
      hour: "numeric",
    };
    const optionsM = {
      minute: "numeric",
    };
    const optionsS = {
      second: "numeric",
    };
    const indonesiaTimeDMY = now.toLocaleString("id-ID", optionsDMY);
    const indonesiaTimeH = now.toLocaleString("id-ID", optionsH);
    const indonesiaTimeM = now.toLocaleString("id-ID", optionsM);
    const indonesiaTimeS = now.toLocaleString("id-ID", optionsS);
    $(".hari-tanggal-tahun").text(indonesiaTimeDMY);
    $(".jam").text(`${indonesiaTimeH} : `);
    $(".menit").text(`${indonesiaTimeM} : `);
    $(".detik").text(`${indonesiaTimeS}`);
  }
  updateTime();
  setInterval(updateTime, 1000);
});
