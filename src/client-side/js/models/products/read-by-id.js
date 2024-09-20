import {
  getPersediaanProductId,
  getPersediaanQty,
  getPersediaanRpSumProductId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
$(document).ready(function () {
  $(document)
    .off("click", "#productDetailBtn")
    .on("click", "#productDetailBtn", async function () {
      try {
        const product = this.dataset;
        const productId = parseInt(product.productid);
        const productImg = product.productimage;
        const productInfo = product.productketerangan;
        const productCategory = product.productcategory;
        const productSupplier = product.productsupplier;
        // name product
        $("#detailProductModalLabel").html(product.productname);
        $("#detail-product-name").text(product.productname);
        // qty
        const qty = await getPersediaanQty(productId);
        const existedProduct = qty >= 1;
        if (existedProduct) {
          $("p#persediaan-refproduct-empty").hide();
          $("#productrefpersediaan-detail").show();
          $("div#product-refpersediaan-read-table").show();
          $("#product-refpersediaan-detail-qty").text(qty);
        }
        if (!existedProduct) {
          $("p#persediaan-refproduct-empty").show();
          $("#productrefpersediaan-detail").hide();
          $("div#product-refpersediaan-read-table").hide();
        }
        // table stock
        const persediaanProduct = await getPersediaanProductId(productId);
        // price
        let txtPrice = ``;
        let txtQty = ``;
        let tr = ``;
        persediaanProduct.forEach((row) => {
          // price
          const persediaanRp = row.PersediaanRp;
          if (persediaanRp < 1) {
            txtPrice = `${formatRupiah2(persediaanRp)}`;
          }
          if (persediaanRp >= 1) {
            txtPrice = "+ " + formatRupiah2(persediaanRp);
          }
          // qty
          const persediaanQty = row.PersediaanQty;
          if (persediaanQty < 1) {
            txtQty = `- ${persediaanQty}`;
          }
          if (persediaanQty >= 1) {
            txtQty = "+ " + persediaanQty;
          }
          // table
          tr += `<tr>
                  <td class="fs-6 align-content-center">${formatWaktuIndo(
                    row.PersediaanDDMY
                  )}</td>
                  <td class="fs-6 align-content-center">${
                    row.PersediaanHMS
                  }</td>
                  <td class="fs-6 align-content-center">${txtQty}</td>
                  <td class="fs-6 align-content-center" id="product-detail-price">${txtPrice}</td>
                </tr>`;
        });
        $("tbody#product-refpersediaan").html(tr);
        // sum rupiah
        const sumRp = await getPersediaanRpSumProductId(productId);
        $("#persediaan-detail-productid").text(formatRupiah2(sumRp));
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
        // price buy
        const productPriceRupiahBuy = formatRupiah2(product.productpricebeli);
        $("p#detail-product-price-buy").text(productPriceRupiahBuy);
        // price sell
        const productPriceRupiahSell = formatRupiah2(product.productpricejual);
        $("p#detail-product-price-sell").text(productPriceRupiahSell);
        // if exist keterangan
        if (productInfo !== "") {
          $("#detail-product-keterangan").text(productInfo);
        }
        // if not exist keterangan
        if (productInfo === "") {
          $("#detail-product-keterangan").text("-");
        }
        // if exist category
        if (productCategory !== "null") {
          $("#detail-category-price").text(productCategory);
        }
        // if no-exist category
        if (productCategory === "null") {
          $("#detail-category-price").text("-");
        }
        // if exist-supplier
        if (productSupplier !== "null") {
          $("#proudct-detail-refsupplier").text(productSupplier);
        }
        // if no-exist-supplier
        if (productSupplier === "null") {
          $("#proudct-detail-refsupplier").text("-");
        }
      } catch (error) {
        console.error(error);
      }
    });
});
