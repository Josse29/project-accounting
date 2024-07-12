import { updateProduct } from "../../../../serverless-side/functions/product.js";
import { listCategoryRefProductUpdate } from "../categories/list.js";
import { listSupplierRefProductUpdate } from "../supplier/list.js";
import { getProductRef, getProductsAgain } from "./read.js";
import { successActionProduct } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
$(document).ready(function () {
  // upadte | event binding
  $(document)
    .off("click")
    .on("click", "#editProduct", function () {
      listCategoryRefProductUpdate();
      listSupplierRefProductUpdate();
      // get value from params
      const product = this.dataset;
      // all-input-product
      $("#product-refcategory-update").val(product.productcategoryname);
      $("#product-refcategory-update-val").val(product.productcategoryid);
      $("#product-refsupplier-update").val(product.productsuppliername);
      $("#product-refsupplier-update-val").val(product.productsupplierid);
      $("#editProductModalLabel").html(product.productname);
      $("#edit-product-name").val(product.productname);
      $("input#edit-product-price").val(formatRupiah1(product.productprice));
      $("#edit-product-keterangan").val(product.productketerangan);
      // Format as Rupiah
      $("input#edit-product-price").on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
      // it doesn't exist productimage from params
      if (product.productimage === "null") {
        $("#section-edit-product-img").hide();
        $("img#edit-product-image").attr("src", "");
      }
      // it exist productimage from params
      if (product.productimage !== "null") {
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
      // function to updateProduct Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
      $("#edit-product-submit")
        .off("click")
        .on("click", () => {
          // all - input
          const productId = parseInt(product.productid);
          const productName = capitalizeWord($("#edit-product-name").val());
          const productPrice = disFormatRupiah1($("#edit-product-price").val());
          const productInfo = $("#edit-product-keterangan").val();
          const productCategoryId = parseInt(
            $("#product-refcategory-update-val").val()
          );
          const productSupplierId = parseInt(
            $("#product-refsupplier-update-val").val()
          );
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
              productPrice,
              productInfo,
              imgbase64,
              productCategoryId,
              productSupplierId,
              (status, response) => {
                if (status) {
                  getProductsAgain();
                  getProductRef();
                  successActionProduct(response);
                  $("#edit-product-image-file").val("");
                }
                if (!status) {
                  console.log(response);
                }
              }
            );
          }
        });
    });
});
