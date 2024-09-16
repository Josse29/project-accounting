$(document)
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
    $("#persediaan-detail-productname").text(productName);
    $("#persediaan-detail-date").text(formatWaktuIndo(persediaanYMD));
    $("#persediaan-detail-second").text(persediaanHMS);
    if (persediaanInfo === "") {
      $("#persediaan-detail-info").text("-");
    }
    if (persediaanInfo !== "") {
      $("#persediaan-detail-info").text(persediaanInfo);
    }
    $("#persediaanDetailTitle").text(productName);
    // qty
    let tdProductQty = ``;
    if (persediaanQty < 1) {
      tdProductQty = `<span class="badge text-bg-danger">${addSpace(
        persediaanQty
      )}</span>`;
    }
    if (persediaanQty >= 1) {
      tdProductQty = `<span class="badge text-bg-success">+ ${persediaanQty}</span>`;
    }
    $("td#persediaan-detail-productqty").html(tdProductQty);
    // product price
    $("td#persediaan-detail-productprice").text(formatRupiah2(productPriceBuy));
    // persediaan rp
    let txtPersediaanRp = ``;
    if (persediaaanRp < 1) {
      txtPersediaanRp =
        persediaaanRp.substr(0, 1) +
        " " +
        formatRupiah2(persediaaanRp.substr(1));
    }
    if (persediaaanRp >= 1) {
      txtPersediaanRp = formatRupiah2(persediaaanRp);
    }
    $("td#persediaan-detail-rp").text(txtPersediaanRp);
  });
