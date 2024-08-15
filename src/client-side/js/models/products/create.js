import { insertProducts } from "../../../../serverless-side/functions/product.js";
import { getProductRef, getProductsAgain } from "./read.js";
import {
  createBlankValue,
  successActionProduct,
  uiCreateFailed,
} from "./ui.js";
import { listCategoryRefProductCreate } from "./../categories/list.js";
import { listSupplierRefProductCreate } from "../supplier/list.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { listProductRefPersediaanCreate } from "./list.js";

$(document).ready(function () {
  $("button#product-create").on("click", function () {
    $("div#productCreateFailed").html("");
    listCategoryRefProductCreate();
    listSupplierRefProductCreate();
  });
  // Format as Rupiah when input
  $("input#product-price-beli").on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
  // Format as Rupiah when input
  $("input#product-price-jual").on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
  // create product
  $("#submit_product")
    .off("click")
    .on("click", () => {
      const productName = capitalizeWord($("#product-name").val().trim());
      const productInfo = $("#product-keterangan").val();
      const productCategoryId = $("#product-refcategory-create").val();
      const productSupplierId = $("#product-refsupplier-create").val();
      const productPriceBuy = disFormatRupiah1($("#product-price-beli").val());
      const productPriceSell = disFormatRupiah1($("#product-price-jual").val());
      const productImg = document.getElementById("create-image-product").files;
      // with an image
      if (productImg.length >= 1) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageBase64 = reader.result;
          callInsertProuduct(imageBase64);
        };
        if (productImg[0]) {
          reader.readAsDataURL(productImg[0]);
        }
      }
      // without an image
      if (productImg.length < 1) {
        callInsertProuduct("null");
      }
      // function to submit product
      function callInsertProuduct(imageBase64) {
        insertProducts(
          productName,
          productPriceBuy,
          productPriceSell,
          productInfo,
          imageBase64,
          productCategoryId,
          productSupplierId,
          (status, response) => {
            if (status) {
              $("#productCreateModal").modal("hide");
              getProductsAgain();
              getProductRef();
              createBlankValue();
              successActionProduct(response);
              listProductRefPersediaanCreate();
            }
            if (!status) {
              const modalBody = document.getElementById(
                "productCreate-modal-body"
              );
              if (modalBody) {
                modalBody.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
              uiCreateFailed(response);
              console.error(response);
            }
          }
        );
      }
    });
  // cancel-product-create-image
  $("#cancel-image").on("click", () => {
    $("#create-image-product").val("");
    $("#section-image").addClass("d-none");
  });
});
