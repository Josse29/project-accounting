import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { getByProductId1, getSumQty } from "../persediaan/services.js";
$("tbody#product-table")
  .off("click", "#productDetailBtn")
  .on("click", "#productDetailBtn", async function () {
    const product = $(this).closest("tr")[0].dataset;
    const productId = parseInt(product.productid);
    const productName = product.productname;
    const productImg = product.productimage;
    const productInfo = product.productketerangan;
    const productCategory = product.productcategory;
    const productSupplier = product.productsupplier;
    const productPriceBuy = parseInt(product.productpricebeli);
    const productPriceSell = parseInt(product.productpricejual);
    // 1.name product
    $("#detailProductModalLabel").html(productName);
    $("#detail-product-name").text(productName);
    // 2.image
    // if exist image
    if (productImg !== "null") {
      $("#detail-product-image").removeClass("d-none");
      $("img#detail-product-image").attr("src", productImg);
      $("#detail-no-image").text(``);
    }
    // if not exist image
    if (productImg === "null") {
      $("#detail-product-image").addClass("d-none");
      $("img#detail-product-image").attr("src", "");
      $("#detail-no-image").text(`no - image displayed`);
    }
    // 3.price buy
    const productPriceBuyRp = formatRupiah2(productPriceBuy);
    $("p#detail-product-price-buy").text(productPriceBuyRp);
    // 4.price sell
    const productPriceRupiahSell = formatRupiah2(productPriceSell);
    $("p#detail-product-price-sell").text(productPriceRupiahSell);
    // 5.Stock
    // 1. summary (price,qty, totalprice)
    console.log("test");
    const qty = await getSumQty(productId);
    const qtyStatus = qty.status;
    const qtyResponse = qty.response;
    let summary = ``;
    if (qtyStatus) {
      const total = formatRupiah2(qtyResponse * productPriceBuy);
      summary = `
      <p class="fs-5 mb-1">Price : ${productPriceBuyRp}</p>
      <p class="fs-5 mb-1">Total Qty : ${qtyResponse}</p>
      <p class="fs-5 mb-3">Total Price : ${total}</p>`;
    }
    if (!qtyStatus) {
      console.error(qtyResponse);
    }
    // 4.table stock
    const persediaanProduct = await getByProductId1(productId);
    const stockStatus = persediaanProduct.status;
    const stockRes = persediaanProduct.response;
    if (stockStatus) {
      const existedStock = stockRes.length >= 1;
      if (existedStock) {
        let listStock = ``;
        stockRes.forEach((row) => {
          const persediaanYMD = formatWaktuIndo(row.PersediaanDDMY);
          const persediaanHMS = row.PersediaanHMS;
          const persediaanQty = row.PersediaanQty;
          // price
          const priceBuy = persediaanQty * productPriceBuy;
          const totalPriceTxt =
            persediaanQty < 1
              ? `- ${formatRupiah2(Math.abs(priceBuy))}`
              : `+ ${formatRupiah2(priceBuy)}`;
          // qty
          const bg = persediaanQty >= 1 ? "text-bg-success" : "text-bg-danger";
          const qty =
            persediaanQty >= 1
              ? `+ ${Math.abs(persediaanQty)}`
              : `- ${Math.abs(persediaanQty)}`;
          const span = `
          <span class="badge ${bg} ms-2">${qty}</span>`;
          listStock += `
          <li class="list-group-item">
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <p class="fs-6 mb-0">Date : ${persediaanYMD}</p>
              <p class="fs-6 mb-0">Hour : ${persediaanHMS}</p>
            </div>
            <div class="ms-2">
              <p class="mb-2 fs-6">${productName} ${span}</p>
              <p class="fs-6 mb-0">Total : ${totalPriceTxt}</p>
            </div>
          </li>`;
        });
        let listStock1 = `
        <div class="card">
          <div class="card-header bg-secondary text-white fs-5">
            Table Stock ${productName}
          </div>
          <ul
            class="list-group list-group-flush overflow-y-auto"
            style="max-height: 200px"
            id="product-detail-stock"
          >
            ${listStock}
          </ul>
        </div>`;
        const stockAllHtml = `${summary} ${listStock1}`;
        $("div#product-detail-stock").html(stockAllHtml);
      }
      if (!existedStock) {
        const emptyHtml = `<p class="text-muted fst-italic fs-5 text-center">stock empty.....</p>`;
        $("div#product-detail-stock").html(emptyHtml);
      }
    }
    if (!stockStatus) {
      console.error(stockRes);
    }
    // sum rupiah
    const sumRp = qty * productPriceBuy;
    $("#persediaan-detail-productid").text(formatRupiah2(sumRp));
    // keterangan
    const productInfoTxt = productInfo !== "" ? productInfo : "-";
    $("#detail-product-keterangan").text(productInfoTxt);
    // category
    const productCategoryTxt =
      productCategory !== "null" ? productCategory : "-";
    $("#detail-category").text(productCategoryTxt);
    // supplier
    const productSupplierTxt =
      productSupplier !== "null" ? productSupplier : "-";
    $("#proudct-detail-refsupplier").text(productSupplierTxt);
  });
