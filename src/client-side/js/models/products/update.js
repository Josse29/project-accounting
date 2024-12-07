import { update } from "./services.js";
import { listCategoryRefProductUpdate } from "../categories/list.js";
import { listSupplierRefProductUpdate } from "../supplier/list.js";
import { uiAlertSuccess, uiAlertFailUpdate } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { getImageBase64, validateImg } from "../../utils/loadImg.js";
import { getProductAll, getProductRef } from "./utils.js";

// upadte | event binding
$("tbody#product-table")
  .off("click", "#editProduct")
  .on("click", "#editProduct", async function () {
    // init ui
    $("#product-update-failed").html("");
    $("#edit-product-image-file").val("");
    // get value from params
    const product = $(this).closest("tr")[0].dataset;
    console.log(product);
    const productName = product.productname;
    const productPriceBeli = formatRupiah1(product.productpricebeli);
    const productPriceSell = formatRupiah1(product.productpricejual);
    const productImg = product.productimage;
    const productCategoryId = parseInt(product.productcategoryid);
    const productSupplierId = parseInt(product.productsupplierid);
    const productInfo = product.productketerangan;
    // list option
    await listCategoryRefProductUpdate(productCategoryId);
    await listSupplierRefProductUpdate(productSupplierId);
    // all-input-product
    $("#editProductModalLabel").html(productName);
    $("#edit-product-name").val(productName);
    $("input#edit-product-price-buy").val(productPriceBeli);
    $("input#edit-product-price-sell").val(productPriceSell);
    $("select#product-refcategory-update").val(productCategoryId);
    $("select#product-refsupplier-update").val(productSupplierId);
    $("#edit-product-keterangan").val(productInfo);
    // Format as Rupiah
    $("input#edit-product-price-buy")
      .off("input")
      .on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
    $("input#edit-product-price-sell")
      .off("input")
      .on("input", function () {
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
      $("img#edit-product-image").attr("src", productImg);
      $("#section-edit-product-img").show();
    }
    // preview-image-product on edit kesell
    let productCancelImg = false;
    $("#edit-product-image-file")
      .off("change")
      .on("change", async (event) => {
        try {
          const target = event.target.files;
          const validate = validateImg(target);
          if (validate) {
            const imgbase64 = await getImageBase64(target[0]);
            $("img#edit-product-image").attr("src", imgbase64);
            $("#section-edit-product-img").show();
          }
          if (!validate) {
            $("#section-edit-product-img").hide();
          }
          productCancelImg = false;
        } catch (error) {
          console.error(error);
        }
      });
    // remove-image
    $("#edit-product-cancel-image")
      .off("click")
      .on("click", function () {
        productCancelImg = true;
        $("#edit-product-image-file").val("");
        $("#section-edit-product-img").hide();
      });
    // req-to-db
    $("#edit-product-submit")
      .off("click")
      .on("click", async () => {
        // all - input
        // productid
        const productId = parseInt(product.productid);
        // productname
        const productName = capitalizeWord(
          $("#edit-product-name").val().trim()
        );
        // price buy
        const productPriceBuy = disFormatRupiah1(
          $("#edit-product-price-buy").val()
        );
        // price sell
        const productPriceSell = disFormatRupiah1(
          $("#edit-product-price-sell").val()
        );
        // information
        const productInfo = $("#edit-product-keterangan").val();
        // category id
        let productCategoryId;
        const productCategoryVal = $("select#product-refcategory-update").val();
        if (productCategoryVal !== "null") {
          productCategoryId = parseInt(productCategoryVal);
        }
        if (productCategoryVal === "null") {
          productCategoryId = "null";
        }
        // supplier id
        let productSupplierId;
        const productSupplierVal = $("select#product-refsupplier-update").val();
        if (productSupplierVal !== "null") {
          productSupplierId = parseInt(productSupplierVal);
        }
        if (productSupplierVal === "null") {
          productSupplierId = "null";
        }
        // image
        const productImgVal = $("#edit-product-image-file")[0].files;
        const req = {
          productId,
          productName,
          productPriceBuy,
          productPriceSell,
          productCategoryId,
          productSupplierId,
          productInfo,
          productImgVal,
          productCancelImg,
        };
        const { status, response } = await update(req);
        if (status) {
          await getProductAll();
          await getProductRef();
          $("#edit-product-image-file").val("");
          uiAlertSuccess(response);
          $("#editProductModal").modal("hide");
        }
        if (!status) {
          console.error(response);
          uiAlertFailUpdate(response);
          const modalBody = document.getElementById("product-update-modalBody");
          if (modalBody) {
            modalBody.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }
      });
  });
