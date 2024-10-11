import { insertProducts } from "../../../../serverless-side/functions/product.js";
import { getProductRef, getProductsAgain } from "./read.js";
import { uiAlertFailCreate, uiAlertSuccess, uiBlankVal } from "./ui.js";
import { listCategoryRefProductCreate } from "./../categories/list.js";
import { listSupplierRefProductCreate } from "../supplier/list.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { listProductRefPersediaanCreate } from "./list.js";
import { getImageBase64 } from "../../utils/loadImg.js";

$("button#product-create")
  .off("click")
  .on("click", function () {
    $("div#productCreateFailed").html("");
    listCategoryRefProductCreate();
    listSupplierRefProductCreate();
  });
// Format as Rupiah when input
$("input#product-price-beli")
  .off("input")
  .on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
$("input#product-price-jual")
  .off("input")
  .on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
// preview-image-product on create
$("#create-image-product")
  .off("change")
  .on("change", async (event) => {
    try {
      const files = event.target.files;
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (files.length > 0) {
        if (validImageTypes.includes(files[0].type)) {
          const imgBase64 = await getImageBase64(files[0]);
          $("#create-image-product-preview").attr("src", imgBase64);
          $("#section-image").removeClass("d-none");
        }
        if (!validImageTypes.includes(files[0].type)) {
          $("#section-image").addClass("d-none");
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
// cancel-product-create-image
$("#cancel-image")
  .off("click")
  .on("click", () => {
    $("#create-image-product").val("");
    $("#section-image").addClass("d-none");
  });
// create product
$("#submit_product")
  .off("click")
  .on("click", async () => {
    try {
      const productName = capitalizeWord($("#product-name").val().trim());
      const productInfo = $("#product-keterangan").val();
      const productCategoryId = $("#product-refcategory-create").val();
      const productSupplierId = $("#product-refsupplier-create").val();
      const productPriceBuy = disFormatRupiah1($("#product-price-beli").val());
      const productPriceSell = disFormatRupiah1($("#product-price-jual").val());
      const productImg = document.getElementById("create-image-product").files;
      let imgBase64 = ``;
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (
        productImg.length > 0 &&
        validImageTypes.includes(productImg[0].type)
      ) {
        imgBase64 = await getImageBase64(productImg[0]);
      } else {
        imgBase64 = "null";
      }
      const req = {
        productName,
        productPriceBuy,
        productPriceSell,
        productInfo,
        productCategoryId,
        productSupplierId,
        productImg,
        imgBase64,
      };
      const response = await insertProducts(req);
      uiAlertSuccess(response);
      getProductsAgain();
      getProductRef();
      uiBlankVal();
      listProductRefPersediaanCreate();
      $("#productCreateModal").modal("hide");
    } catch (error) {
      const errMsg = error || error.message;
      uiAlertFailCreate(errMsg);
      const modalBody = $("#productCreate-modal-body").get(0);
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.error(error);
    }
  });
