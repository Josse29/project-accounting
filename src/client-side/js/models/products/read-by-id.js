$(document)
  .off("click", "#productDetailBtn")
  .on("click", "#productDetailBtn", function () {
    const product = this.dataset;
    const productId = parseInt(product.productid);
    const productImg = product.productimage;
    const productInfo = product.productketerangan;
    const productCategory = product.productcategory;
    const productSupplier = product.productsupplier;
    getPersediaanQty(productId, (status, response) => {
      if (status) {
        const existedProduct = response !== null;
        if (existedProduct) {
          $("p#persediaan-refproduct-empty").hide();
          $("#productrefpersediaan-detail").show();
          $("div#product-refpersediaan-read-table").show();
          $("#product-refpersediaan-detail-qty").text(response);
          getPersediaanProductDetail();
        }
        if (!existedProduct) {
          $("p#persediaan-refproduct-empty").show();
          $("#productrefpersediaan-detail").hide();
          $("div#product-refpersediaan-read-table").hide();
        }
      }
      if (!status) {
        console.error(response);
      }
    });
    function getPersediaanProductDetail() {
      getPersediaanProductId(productId, (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((row) => {
            let txtPrice = ``;
            let txtQty = ``;
            const persediaanRp = row.PersediaanRp.toString();
            if (persediaanRp < 1) {
              txtPrice =
                persediaanRp.slice(0, 1) +
                " " +
                formatRupiah2(persediaanRp.slice(1));
            }
            if (persediaanRp >= 1) {
              txtPrice = "+ " + formatRupiah2(persediaanRp);
            }
            const persediaanQty = row.PersediaanQty.toString();
            if (persediaanQty < 1) {
              txtQty = persediaanQty.slice(0, 1) + " " + persediaanQty.slice(1);
            }
            if (persediaanQty >= 1) {
              txtQty = "+ " + persediaanQty;
            }
            tr += `<tr>
                <td class="fs-6 align-content-center">${formatWaktuIndo(
                  row.PersediaanDDMY
                )}</td>
                <td class="fs-6 align-content-center">${row.PersediaanHMS}</td>
                <td class="fs-6 align-content-center">${txtQty}</td>
                <td class="fs-6 align-content-center" id="product-detail-price">${txtPrice}</td>
              </tr>`;
          });
          $("tbody#product-refpersediaan").html(tr);
        }
        if (!status) {
          console.error(response);
        }
      });
    }
    getPersediaanRpSumProductId(productId, (status, response) => {
      if (status) {
        $("#persediaan-detail-productid").text(formatRupiah2(response));
      }
      if (!status) {
        console.error(response);
      }
    });
    $("#detailProductModalLabel").html(product.productname);
    $("#detail-product-name").text(product.productname);
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
    // price buy and sell
    const productPriceRupiahBuy = formatRupiah2(product.productpricebeli);
    $("p#detail-product-price-buy").text(productPriceRupiahBuy);
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
    // if no-exist categor
    if (productCategory === "null") {
      $("#detail-category-price").text("-");
    }
    // if exist-supplier
    if (productSupplier !== "null") {
      $("#proudct-detail-refsupplier").text(productSupplier);
    }
    // if no-exist-supplie
    if (productSupplier === "null") {
      $("#proudct-detail-refsupplier").text("-");
    }
  });
