import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
$("tbody#persediaan-table")
  .off("click", "#persediaanDetail")
  .on("click", "#persediaanDetail", function () {
    const persediaan = this.dataset;
    const persediaanYMD = persediaan.persediaanddmy;
    const persediaanHMS = persediaan.persediaanhms;
    const persediaanInfo = persediaan.persediaaninfo;
    const persediaanQty = persediaan.persediaanqty;
    const persediaaanRp = persediaan.persediaanrp;
    const productName = persediaan.productname;
    const productPriceBuy = persediaan.productpricebuy;
    // time
    $("#persediaan-detail-productname").text(productName);
    $("#persediaan-detail-date").text(formatWaktuIndo(persediaanYMD));
    $("#persediaan-detail-second").text(persediaanHMS);
    // product-name
    $("#persediaanDetailTitle").text(productName);
    // qty
    const txtQty =
      persediaanQty < 1 ? `- ${Math.abs(persediaanQty)}` : `+ ${persediaanQty}`;
    const spanQty = `<span class="badge ${
      persediaanQty < 1 ? "text-bg-danger" : "text-bg-success"
    }">${txtQty}</span>`;
    $("td#persediaan-detail-productqty").html(spanQty);
    // product price
    $("td#persediaan-detail-productprice").text(formatRupiah2(productPriceBuy));
    // persediaan rp
    const txtPersediaanRp =
      persediaaanRp < 1
        ? `- ${formatRupiah2(Math.abs(persediaaanRp))}`
        : `+ ${formatRupiah2(persediaaanRp)}`;
    $("td#persediaan-detail-rp").text(txtPersediaanRp);
    // information
    const persediaanInfoTxt = persediaanInfo !== "" ? persediaanInfo : "-";
    $("#persediaan-detail-info").text(persediaanInfoTxt);
  });
