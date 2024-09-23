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
        let list = ``;
        persediaanProduct.forEach((row) => {
          const persediaanYMD = row.PersediaanDDMY;
          const persediaanHMS = row.PersediaanHMS;
          const persediaanRp = row.PersediaanRp;
          const persediaanQty = row.PersediaanQty;
          // price
          const txtPrice =
            persediaanRp < 1
              ? `- ${formatRupiah2(Math.abs(persediaanRp))}`
              : `+ ${formatRupiah2(persediaanRp)}`;
          // qty
          const txtQty =
            persediaanQty > 1 ? `- ${persediaanQty}` : `+ ${persediaanQty}`;
          // table
          tr += `<tr>
                  <td class="fs-6 align-content-center">${formatWaktuIndo(
                    persediaanYMD
                  )}</td>
                  <td class="fs-6 align-content-center">${persediaanHMS}</td>
                  <td class="fs-6 align-content-center">${txtQty}</td>
                  <td class="fs-6 align-content-center" id="product-detail-price">${txtPrice}</td>
                </tr>`;
          list += `<div class="mt-2 ms-2">
                      <div
                        class="mb-1 d-flex justify-content-between align-items-center"
                      >
                        <p class="fs-5 mb-0">Date</p>
                        <p class="fs-6 mb-0">Hour</p>
                      </div>
                      <div class="ms-2">
                        <p class="mb-2 fs-5">
                          Product Name
                          <span class="badge text-bg-success ms-2">1</span>
                        </p>
                        <p class="fs-5">Total : sdfsdfsdfsdfsdfsdfsdfsdf</p>
                      </div>
                    </div>`;
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
