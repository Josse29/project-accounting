import { formatRupiah2 } from "../../utils/formatPrice.js";

$("tbody#product-table")
  .off("click", "#productDetailBtn")
  .on("click", "#productDetailBtn", async function () {
    const product = $(this).closest("tr")[0].dataset;
    const productId = parseInt(product.productid);
    const productName = product.productname;
    const productImg = product.productimage;
    const productInfo = product.productketerangan;
    const productSupplier = product.productsuppliername;
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
    // keterangan
    const productInfoTxt = productInfo !== "" ? productInfo : "-";
    $("#detail-product-keterangan").text(productInfoTxt);
    // supplier
    const productSupplierTxt =
      productSupplier !== "null" ? productSupplier : "-";
    $("#proudct-detail-refsupplier").text(productSupplierTxt);
  });
