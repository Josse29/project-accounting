import { timeIndonesian } from "./waktuIndo.js";

$(document).ready(function () {
    const updateTimeHTML = () => {
        $(".hari-tanggal-tahun").html(`${timeIndonesian().indonesiaDayMonthYear}`)
        $(".jam").html(`${timeIndonesian().indonesiaHour} :`)
        $(".menit").html(`${timeIndonesian().indonesiaHour} :`)
        $(".detik").html(`${timeIndonesian().indonesiaSecond}`)
    }

    updateTimeHTML()
    setInterval(() => {
        updateTimeHTML()
    }, 1000)
})