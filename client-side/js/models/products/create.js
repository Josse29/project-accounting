import { insertProducts } from "../../../../serverless-side/functions/product.js";
import { getProductsAgain } from "./read.js";
import { createBlankValue, successActionProduct } from "./ui.js";

$(document).ready(function () {
  // create product
  $("#submit_product")
    .off("click")
    .on("click", () => {
      const productName = $("#product-name").val();
      const productPrice = $("#product-price").val();
      const productInfo = $("#product-keterangan").val();
      const productCategoryId = $("#product-refcategory-create-val").val();
      const productSupplierId = $("#product-refsupplier-create-val").val();
      const productImg = document.getElementById("create-image-product").files;
      // with an image
      if (productImg.length >= 1) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageBase64 = reader.result;
          insertProducts(
            productName,
            productPrice,
            productInfo,
            imageBase64,
            productCategoryId,
            productSupplierId,
            (status, response) => {
              if (status) {
                console.log("create with image");
                console.log(response);
                getProductsAgain();
                successActionProduct(response);
                createBlankValue();
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        };
        if (productImg[0]) {
          reader.readAsDataURL(productImg[0]);
        }
      }
      // without image
      if (productImg.length < 1) {
        insertProducts(
          productName,
          productPrice,
          productInfo,
          "null",
          productCategoryId,
          productSupplierId,
          (status, response) => {
            if (status) {
              console.log(response);
              console.log("upload imageless + form");
              getProductsAgain();
              createBlankValue();
              successActionProduct(response);
            }
            if (!status) {
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
