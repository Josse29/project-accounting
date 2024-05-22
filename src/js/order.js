import {
  sendIpcCloseWindowOrder,
  sendIpcHideWindowOrder,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadData,
  sendIpcLoadItem,
  sendIpcLoadUsers,
  sendIpcMinWinOrder,
} from "./ipc.js";

$("#minWindow").on("click", () => {
  sendIpcMinWinOrder();
});
$("#closeWindow").on("click", () => {
  sendIpcCloseWindowOrder();
});
$("#dashboardWindow").on("click", () => {
  sendIpcHideWindowOrder();
  sendIpcLoadDashboard();
});
$("#itemWindow").on("click", () => {
  sendIpcHideWindowOrder();
  sendIpcLoadItem();
});
$("#dataWindow").on("click", () => {
  sendIpcHideWindowOrder();
  sendIpcLoadData();
});
$("#usersWindow").on("click", () => {
  sendIpcHideWindowOrder();
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
$(document).ready(function () {
  $(".card-header").on("click", function () {
    $(".toggle-numbers").toggleClass("showNumbers");
  });
  $(".list-number").on("click", function () {
    $(".table-number").text(`- ${$(this).text()}`);
  });
});
