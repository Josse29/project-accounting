import { updateProduct } from "../../../../serverless-side/functions/product.js";
import { listCategoryRefProductUpdate } from "../categories/list.js";
import { listSupplierRefProductUpdate } from "../supplier/list.js";
import { getProductRef, getProductsAgain } from "./read.js";
import { successActionProduct, uiUpdateFailed } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
$(document).ready(function () {
  // upadte | event binding
  $(document)
    .off("click")
    .on("click", "#editProduct", function () {
      $("#product-update-failed").html("");
      // get value from params
      const product = this.dataset;
      const productName = product.productname;
      const productPriceBeli = formatRupiah1(product.productpricebeli);
      const productPriceSell = formatRupiah1(product.productpricejual);
      const productImg = product.productimage;
      const productCategoryId = parseInt(product.productcategoryid);
      const productSupplierId = parseInt(product.productsupplierid);
      const productInfo = product.productketerangan;
      listCategoryRefProductUpdate(productCategoryId);
      listSupplierRefProductUpdate(productSupplierId);
      // all-input-product
      $("#editProductModalLabel").html(productName);
      $("#edit-product-name").val(productName);
      $("input#edit-product-price-buy").val(productPriceBeli);
      $("input#edit-product-price-sell").val(productPriceSell);
      $("select#product-refcategory-update").val(productCategoryId);
      $("select#product-refsupplier-update").val(productSupplierId);
      $("#edit-product-keterangan").val(productInfo);
      // Format as Rupiah
      $("input#edit-product-price-buy").on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
      $("input#edit-product-price-sell").on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
      // it doesn't exist productimage from params
      if (productImg === "null") {
        $("#section-edit-product-img").hide();
        $("#edit-product-cancel-image");
        $("img#edit-product-image").attr("src", "");
      }
      // it exist productimage from params
      if (productImg !== "null") {
        $("#section-edit-product-img").show();
        $("img#edit-product-image").attr("src", product.productimage);
      }
      // cancel image
      let cancelImg = false;
      // remove-image
      $("#edit-product-cancel-image")
        .off("click")
        .on("click", function () {
          $("#edit-product-image-file").val("");
          $("#section-edit-product-img").hide();
          cancelImg = true;
        });
      // function action to update product
      $("#edit-product-submit")
        .off("click")
        .on("click", () => {
          // all - input
          const productId = parseInt(product.productid);
          const productName = capitalizeWord($("#edit-product-name").val());
          const productPriceBuy = disFormatRupiah1(
            $("#edit-product-price-buy").val()
          );
          const productPriceSell = disFormatRupiah1(
            $("#edit-product-price-sell").val()
          );
          const productInfo = $("#edit-product-keterangan").val();
          let productCategoryId;
          const productCategoryVal = $(
            "select#product-refcategory-update"
          ).val();
          if (productCategoryVal !== null) {
            productCategoryId = parseInt(
              $("select#product-refcategory-update").val()
            );
          }
          if (productCategoryVal === null || productCategoryVal === "null") {
            productCategoryId = null;
          }
          let productSupplierId;
          const productSupplierVal = $(
            "select#product-refsupplier-update"
          ).val();
          if (productSupplierVal !== null) {
            productSupplierId = parseInt(
              $("select#product-refsupplier-update").val()
            );
          }
          if (productSupplierVal === null || productSupplierVal === "null") {
            productSupplierId = null;
          }
          const productImg = document.getElementById(
            "edit-product-image-file"
          ).files;
          // with image
          if (productImg.length >= 1) {
            const reader = new FileReader();
            reader.onload = function () {
              const imgbase64 = reader.result;
              callUpdateProduct(imgbase64);
            };
            if (productImg[0]) {
              reader.readAsDataURL(productImg[0]);
            }
          }
          // without image
          if (productImg.length < 1) {
            if (cancelImg) {
              callUpdateProduct("null");
            }
            if (!cancelImg) {
              callUpdateProduct(product.productimage);
            }
          }
          function callUpdateProduct(imgbase64) {
            updateProduct(
              productId,
              productName,
              productPriceBuy,
              productPriceSell,
              imgbase64,
              productCategoryId,
              productSupplierId,
              productInfo,
              (status, response) => {
                if (status) {
                  $("#editProductModal").modal("hide");
                  getProductsAgain();
                  getProductRef();
                  successActionProduct(response);
                  $("#edit-product-image-file").val("");
                }
                if (!status) {
                  console.error(response);
                  uiUpdateFailed(response);
                  const modalBody = document.getElementById(
                    "product-update-modalBody"
                  );
                  if (modalBody) {
                    modalBody.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }
              }
            );
          }
        });
    });
});
