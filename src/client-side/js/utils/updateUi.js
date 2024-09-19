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
export const uiLoad = () => {
  const html = `<div class="loading">
                <div class="d-flex gap-2">
                  <p
                    class="animate-load"
                    style="
                      width: 155px;
                      height: 35px;
                      background: rgb(171, 169, 169);
                      border-top-left-radius: 8px;
                      border-bottom-left-radius: 8px;
                    "
                  ></p>
                  <p
                    class="animate-load"
                    style="
                      width: 50px;
                      height: 35px;
                      background: rgb(171, 169, 169);
                    "
                  ></p>
                  <p
                    class="animate-load"
                    style="
                      width: 50px;
                      height: 35px;
                      background: rgb(171, 169, 169);
                      border-top-right-radius: 8px;
                      border-bottom-right-radius: 8px;
                    "
                  ></p>
                </div>
                <div class="d-flex gap-3">
                  <p
                    class="animate-load"
                    style="
                      width: 255px;
                      height: 35px;
                      background: rgb(171, 169, 169);
                      border-top-left-radius: 8px;
                      border-bottom-left-radius: 8px;
                    "
                  ></p>
                  <p
                    class="animate-load"
                    style="
                      width: 650px;
                      height: 35px;
                      background: rgb(171, 169, 169);
                      border-top-right-radius: 8px;
                      border-bottom-right-radius: 8px;
                    "
                  ></p>
                </div>
                <div>
                  <p
                    class="animate-load"
                    style="
                      width: 100%;
                      height: 55px;
                      background: rgb(171, 169, 169);
                    "
                  ></p>
                  <p
                    class="animate-load"
                    style="
                      width: 100%;
                      height: 355px;
                      background: rgb(171, 169, 169);
                    "
                  ></p>
                </div>
                </div>`;
  return html;
};
