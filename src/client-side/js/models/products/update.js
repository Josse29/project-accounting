import { updateProduct } from "../../../../serverless-side/functions/product.js";
import { listCategoryRefProductUpdate } from "../categories/list.js";
import { listSupplierRefProductUpdate } from "../supplier/list.js";
import { getProductRef, getProductsAgain } from "./read.js";
import { successActionProduct, uiUpdateFailed } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { getImageBase64 } from "../../utils/loadImg.js";
$(document).ready(function () {
  // upadte | event binding
  $(document)
    .off("click")
    .on("click", "#editProduct", function () {
      $("#product-update-failed").html("");
      $("#edit-product-image-file").val("");
      // get value from params
      const product = this.dataset;
      const productName = product.productname;
      const productPriceBeli = formatRupiah1(product.productpricebeli);
      const productPriceSell = formatRupiah1(product.productpricejual);
      const productImg = product.productimage;
      const productCategoryId = parseInt(product.productcategoryid);
      const productSupplierId = parseInt(product.productsupplierid);
      const productInfo = product.productketerangan;
      let cancelImg = false;
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
        $("img#edit-product-image").attr("src", "");
        $("#section-edit-product-img").hide();
      }
      // it exist productimage from params
      if (productImg !== "null") {
        $("img#edit-product-image").attr("src", product.productimage);
        $("#section-edit-product-img").show();
      }
      // preview-image-product on edit keselll
      $("#edit-product-image-file")
        .off("change")
        .on("change", async (event) => {
          try {
            const files = event.target.files;
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (files.length > 0) {
              if (validImageTypes.includes(files[0].type)) {
                const imgbase64 = await getImageBase64(files[0]);
                $("img#edit-product-image").attr("src", imgbase64);
                $("#section-edit-product-img").show();
              }
              if (!validImageTypes.includes(files[0].type)) {
                $("#section-edit-product-img").hide();
              }
              cancelImg = false;
            }
          } catch (error) {
            console.error(error);
          }
        });
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
        .on("click", async () => {
          try {
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
            const productImgVal = document.getElementById(
              "edit-product-image-file"
            ).files;
            let imgBase64 = ``;
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!cancelImg) {
              if (
                productImgVal.length > 0 &&
                validImageTypes.includes(productImgVal[0].type)
              ) {
                imgBase64 = await getImageBase64(productImgVal[0]);
              } else {
                imgBase64 = productImg;
              }
            }
            if (cancelImg) {
              imgBase64 = "null";
            }
            const req = {
              productId,
              productName,
              productPriceBuy,
              productPriceSell,
              productImgVal,
              productCategoryId,
              productSupplierId,
              productInfo,
              imgBase64,
            };
            const response = await updateProduct(req);
            $("#editProductModal").modal("hide");
            getProductsAgain();
            getProductRef();
            successActionProduct(response);
            $("#edit-product-image-file").val("");
          } catch (error) {
            const errMsg = error || error.message;
            uiUpdateFailed(errMsg);
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
        });
    });
});
