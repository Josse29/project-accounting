// coming sooon
// import { contextBridge, ipcRenderer } from "electron"; es6
// // Mengekspos API untuk navigasi antar halaman
// const { contextBridge, ipcRenderer } = require("electron"); // CommonJS
// contextBridge.exposeInMainWorld("electron", {
//   navigate: (page) => ipcRenderer.send("navigate", page),
//   showAlert: (title, text) =>
//   ipcRenderer.send("trigger-alert", { title, text }),
// });
// ipcRenderer.on("display-alert", (event, { title, text }) => {
//   const Swal = require("sweetalert2");
//   // Menggunakan SweetAlert2 untuk menampilkan alert
//   Swal.fire({
//     title,
//     text,
//     icon: "info",
//     confirmButtonText: "OK",
//   });
// });
