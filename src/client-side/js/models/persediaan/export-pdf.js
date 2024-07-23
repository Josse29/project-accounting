import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// export pdf product
$("#persediaan-export-pdf").on("click", () => {
  let file_path = dialog.showSaveDialogSync({
    title: "Export Data",
    filters: [{ name: "pdf", extensions: ["pdf"] }],
  });
  if (file_path) {
    file_path = file_path.replace(/\\/g, "/");
    const query = `SELECT 
                   Persediaan.PersediaanId, 
                   Persediaan.PersediaanDDMY,
                   Persediaan.PersediaanHMS,
                   Persediaan.PersediaanQty,
                   Persediaan.PersediaanRp,
                   Product.ProductName
                   FROM Persediaan
                   LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                   ORDER BY Persediaan.PersediaanId DESC`;
    db.all(query, (err, result) => {
      if (!err) {
        let no = 1;
        let tbody = ``;
        result.forEach((row) => {
          const totalQty = row.PersediaanQty;
          const totalRp = row.PersediaanRp;
          let totalQtyTxt =
            totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
          let totalRpTxt =
            totalRp >= 1
              ? `+ ${formatRupiah2(totalRp)}`
              : `- ${formatRupiah2(Math.abs(totalRp))}`;
          tbody += `<tr>
                      <td class="text-center text-nowrap align-content-center">${no++}</td>
                      <td class="text-nowrap align-content-center">${formatWaktuIndo(
                        row.PersediaanDDMY
                      )}</td>
                      <td class="text-nowrap align-content-center">${
                        row.PersediaanHMS
                      }</td>
                      <td class="text-nowrap align-content-center">${
                        row.ProductName
                      }</td>
                      <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
                      <td class="text-nowrap align-content-center">${totalRpTxt}</td>
                    </tr>`;
        });
        ipcRenderer.send("pdf:persediaan", tbody, file_path);
      }
      if (err) {
        console.error(err);
      }
    });
  }
});
