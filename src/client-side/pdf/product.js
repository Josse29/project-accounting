import { getPDF } from "./../js/models/products/services.js";
import { formatRupiah2 } from "./../js/utils/formatRupiah.js";

const { status, response } = await getPDF();
if (status) {
  let no = 1;
  let tbody = ``;
  response.forEach((row) => {
    const productPriceBuy = formatRupiah2(row.ProductPriceBeli);
    const productPriceSell = formatRupiah2(row.ProductPriceJual);
    const productInfo = row.ProductInfo !== "" ? row.ProductInfo : "-";
    tbody += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no}</td>
      <td class="text-nowrap align-content-center">${row.ProductName}</td>
      <td class="text-nowrap align-content-center">${productPriceBuy}</td>
      <td class="text-nowrap align-content-center">${productPriceSell}</td>
      <td style="width:200px">
        <img src="${row.ProductImage}" style="width:100%"/>
      </td>
      <td class="text-nowrap align-content-center">${productInfo}</td>
    </tr>`;
    no++;
  });
  $("#tbody-pdf").html(tbody);
  ipcRenderer.send("create:pdf-product");
  contextBridge.exposeInMainWorld("pdfConverter", {
    convertToPDF: async (pdfName) => {
      const result = await ipcRenderer.invoke("convert-to-pdf", pdfName);
      alert(`PDF Saved on di: ${result}`);
    },
  });
}
if (!status) {
  console.error(response);
}
