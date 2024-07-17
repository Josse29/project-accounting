import { timeIndonesian } from "./formatWaktu.js";

$(document).ready(function () {
  const updateTimeHTML = () => {
    const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
      timeIndonesian();
    $(".hari-tanggal-tahun").html(`${indonesiaDDMY}`);
    $(".jam").html(`${indonesiaHour} : `);
    $(".menit").html(`${indonesiaMinute} : `);
    $(".detik").html(`${indonesiaSecond}`);
  };
  updateTimeHTML();
  setInterval(() => {
    updateTimeHTML();
  }, 1000);
});

// reinit tooltip
// export const reinitializeTooltips = () => {
//   const tooltipTriggerList = document.querySelectorAll(
//     '[data-bs-toggle="tooltip"]'
//   );
//   const tooltipList = [...tooltipTriggerList].map(
//     (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
//   );
//   return tooltipList;
// };
export const reinitializeTooltips = () => {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};
