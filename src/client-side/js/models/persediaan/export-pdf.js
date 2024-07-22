import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
const number = -1;
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
                   Product.ProductName,
                   Supplier.SupplierName
                   FROM Persediaan
                   LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                   LEFT JOIN Supplier ON Supplier.SupplierId = Supplier.SupplierId
                   ORDER BY Persediaan.PersediaanId DESC`;
    db.all(query, (err, result) => {
      if (!err) {
        let no = 1;
        let thead = `<tr>
                        <th class="text-center">No</th>
                        <th class="text-center">Tanggal</th>
                        <th class="text-center">Jam</th>
                        <th class="text-center">Nama Product</th>
                        <th class="text-center">Qty</th>
                        <th class="text-center">Rupiah</th>
                        <th class="text-center">Supplier</th>
                      </tr> `;
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
                      <td class="text-nowrap align-content-center">${
                        row.SupplierName
                      }</td>
                    </tr>`;
        });
        ipcRenderer.send("pdf:persediaan", thead, tbody, file_path);
      }
      if (err) {
        console.error(err);
      }
    });
  }
});
