import {
  sendIpcCloseWindowUsers,
  sendIpcHideWindowUsers,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadData,
  sendIpcLoadItem,
  sendIpcLoadOrder,
  sendIpcMinWinUsers,
} from "./ipc.js";

$("#minWindow").on("click", () => {
  sendIpcMinWinUsers();
});
$("#closeWindow").on("click", () => {
  sendIpcCloseWindowUsers();
});
$("#dashboardWindow").on("click", () => {
  sendIpcHideWindowUsers();
  sendIpcLoadDashboard();
});
$("#orderWindow").on("click", () => {
  sendIpcHideWindowUsers();
  sendIpcLoadOrder();
});
$("#itemWindow").on("click", () => {
  sendIpcHideWindowUsers();
  sendIpcLoadItem();
});
$("#dataWindow").on("click", () => {
  sendIpcHideWindowUsers();
  sendIpcLoadData();
});
$("#aboutWindow").on("click", () => {
  sendIpcHideWindowUsers();
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
