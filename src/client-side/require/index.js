// electron [ipcRenderer]
const electron = require("electron");
const { ipcRenderer } = electron;

// db
const db = require("./../config/db.js");

// dialog
const { dialog } = require("@electron/remote");

// file-system
const fs = require("fs");

// swal
const Swal = require("sweetalert2");
