import {
    sendIpcMinWinLogin,
    sendIpcMinMaxWinLogin,
    sendIpcCloseWindowLogin,
    sendIpcLoadDashboard,
    sendIpcLoadRegister
} from "../utils/ipc.js";
console.log("test")
$("#email").focus();
// toggle text-password
$("#toggle-password").on("change", function () {
    if ($(this).is(":checked")) {
        let showPassword = `<label
                            class="fa-solid fa-eye-slash me-2 show-password"
                            for="toggle-password"
                            ></label>`;
        $(".toggle-password").html(showPassword);
        $("#password").attr("type", "text");
    } else {
        let hidePassword = `<label
                                class="fa-solid fa-eye me-2 hide-password"
                                for="toggle-password"
                                </label>`;
        $(".toggle-password").html(hidePassword);
        $("#password").attr("type", "password");
    }
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
        const optionsHMS = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        const indonesiaTimeDMY = now.toLocaleString("id-ID", optionsDMY);
        $(".hari-tanggal-tahun").text(`${indonesiaTimeDMY} | `);
        const indonesiaTimeHMS = now.toLocaleString("id-ID", optionsHMS);
        $(".jam-menit-detik").text(indonesiaTimeHMS);
    }
    updateTime();
    setInterval(updateTime, 1000);
});
// ipc
$("#minWindow").on("click", () => {
    sendIpcMinWinLogin();
});
$("#minMaxWindow").on("click", () => {
    sendIpcMinMaxWinLogin();
});
$("#closeWindow").on("click", () => {
    sendIpcCloseWindowLogin();
});
$("#login").on("click", () => {
    sendIpcLoadDashboard();
});
$(".register").on("click", () => {
    sendIpcLoadRegister();
});
