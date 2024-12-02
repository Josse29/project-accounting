const convertPdf = (pagePDF) => {
  return new Promise((resolve, reject) => {
    let file_path = dialog.showSaveDialogSync({
      title: "Export Data",
      filters: [{ name: "pdf", extensions: ["pdf"] }],
    });
    if (file_path) {
      file_path = file_path.replace(/\\/g, "/");
      pagePDF.webContents
        .printToPDF({
          marginsType: 0,
          printBackground: true,
          printSelectionOnly: false,
          landscape: true,
        })
        .then((data) => {
          fs.writeFile(file_path, data, (err) => {
            if (!err) {
              resolve();
            }
            if (err) {
              reject();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
const convertpdf1 = () => {
  let file_path = dialog.showSaveDialogSync({
    title: "Export Data",
    filters: [{ name: "pdf", extensions: ["pdf"] }],
  });
  if (file_path) {
    file_path = file_path.replace(/\\/g, "/");
    let no = 1;
    let tbody = ``;
    response.forEach((row) => {
      tbody += uiTrPDf(no, row);
      no++;
    });
    ipcRenderer.send("pdf:product", tbody, file_path);
    ipcRenderer.on("success:pdf-product", (e, file_path) => {
      uiAlertSuccess(`File PDF tersimpan di ${file_path}`);
    });
  }
};

module.exports = convertPdf;
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Memasukkan plugin autoTable untuk jsPDF
document.getElementById("convert-to-pdf").addEventListener("click", () => {
  // Mengambil elemen tabel
  const table = document.getElementById("data-table");
  // Membuat objek jsPDF
  const doc = new jsPDF();
  // Menambahkan tabel dari DOM ke PDF
  doc.autoTable({ html: table });
  // Menyimpan PDF ke file
  doc.save("table-data.pdf");
});
