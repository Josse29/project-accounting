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
export const reinitTooltip = () => {
  // Inisialisasi ulang tooltip setelah konten baru di-load
  $('[data-bs-toggle="tooltip"]').tooltip();
};
export const reinitializeTooltips = () => {
  // Inisialisasi ulang tooltip setelah konten baru di-load
  $('[data-bs-toggle="tooltip"]').tooltip();
};
