import { updateProduct } from "../../../../serverless-side/functions/product.js";
import { listCategoryRefProductUpdate } from "../categories/list.js";
import { listSupplierRefProductUpdate } from "../supplier/list.js";
import { getProductsAgain } from "./read.js";
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
      // Format as Rupiah
      $("input#edit-product-price").on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
      $("#edit-product-keterangan").val(product.productketerangan);
      // it doesn't exist productimage from params
      if (product.productimage === "null") {
        $("#section-edit-product-img").addClass("d-none");
        $("img#edit-product-image").attr("src", "");
      }
      // it exist productimage from params
      if (product.productimage !== "null") {
        $("#section-edit-product-img").removeClass("d-none");
        $("img#edit-product-image").attr("src", product.productimage);
      }
      // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
      $("#edit-product-submit").off("click");
      // action image kesell xxx
      $("#edit-product-submit").on("click", () => {
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
                  console.log(response);
                  getProductsAgain();
                  successActionProduct(response);
                  $("#edit-product-image-file").val("");
                }
                if (!status) {
                  console.log(response);
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
          updateProduct(
            productId,
            productName,
            productPrice,
            productInfo,
            "",
            productCategoryId,
            productSupplierId,
            (status, response) => {
              if (status) {
                console.log(response);
                getProductsAgain();
                successActionProduct(response);
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        }
      });
      // remove-image
      $("#edit-product-cancel-image"),
        off("click").on("click", () => {
          db.run(
            `UPDATE products
           SET image = 'null'
           WHERE id = '${product.productid}'`,
            (err) => {
              if (!err) {
                console.log("berhasil-hapus gambar ");
                $("#edit-product-image-file").val("");
                $("#section-edit-product-img").addClass("d-none");
                getProductsAgain();
              }
              if (err) {
                console.log(err);
                console.log("gagal-hapus-gambar");
              }
            }
          );
        });
    });
});
