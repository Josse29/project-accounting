import formatQty from "../../utils/formatQty.js";

$("tbody#persediaan-table")
  .off("click", "#persediaanDetail")
  .on("click", "#persediaanDetail", function () {
    const persediaan = $(this).closest("tr")[0].dataset;
    const persediaanYMD = persediaan.persediaanddmy;
    const persediaanHMS = persediaan.persediaanhms;
    const persediaanInfo = persediaan.persediaaninfo;
    const persediaanQty = parseFloat(persediaan.persediaanqty);
    const persediaaanRp = persediaan.persediaanrp;
    const productName = persediaan.productname;
    const productPriceBuy = persediaan.productpricebuy;
    // time
    $("#persediaan-detail-productname").text(productName);
    $("#persediaan-detail-date").text(persediaanYMD);
    $("#persediaan-detail-second").text(persediaanHMS);
    // product-name
    $("#persediaanDetailTitle").text(productName);
    // qty
    const spanBg = persediaanQty < 1 ? "text-bg-danger" : "text-bg-success";
    const spanQty = `
    <span class="badge ${spanBg}">${formatQty(persediaanQty)}</span>`;
    $("#persediaan-detail-productqty").html(spanQty);
    // product price
    $("#persediaan-detail-productprice").text(productPriceBuy);
    // persediaan rp
    $("#persediaan-detail-rp").text(persediaaanRp);
    // information
    const persediaanInfoTxt = persediaanInfo !== "" ? persediaanInfo : "-";
    $("#persediaan-detail-info").text(persediaanInfoTxt);
  });
