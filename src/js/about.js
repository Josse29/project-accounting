import {
  sendIpcCloseWindowAbout,
  sendIpcHideWindowAbout,
  sendIpcLoadDashboard,
  sendIpcLoadData,
  sendIpcLoadItem,
  sendIpcLoadOrder,
  sendIpcLoadUsers,
  sendIpcMinWinAbout,
} from "./ipc.js";

$("#minWindow").on("click", () => {
  sendIpcMinWinAbout();
});
$("#closeWindow").on("click", () => {
  sendIpcCloseWindowAbout();
});

$("#dashboardWindow").on("click", () => {
  sendIpcHideWindowAbout();
  sendIpcLoadDashboard();
});
$("#orderWindow").on("click", () => {
  sendIpcHideWindowAbout();
  sendIpcLoadOrder();
});
$("#itemWindow").on("click", () => {
  sendIpcHideWindowAbout();
  sendIpcLoadItem();
});
$("#dataWindow").on("click", () => {
  sendIpcHideWindowAbout();
  sendIpcLoadData();
});
$("#usersWindow").on("click", () => {
  sendIpcHideWindowAbout();
  sendIpcLoadUsers();
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