import { getProductRef, getProductsAgain } from "./read.js";
import { uiAlertFailCreate, uiAlertSuccess, uiBlankVal } from "./ui.js";
import { listCategoryRefProductCreate } from "./../categories/list.js";
import { listSupplierRefProductCreate } from "../supplier/list.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { listProductRefPersediaanCreate } from "./list.js";
import { getImageBase64, previewLoadImg } from "../../utils/loadImg.js";
import { addProduct } from "./services.js";

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
// preview-image
const args = {
  inputImg: $("#create-image-product"),
  sectionImg: $("#section-image"),
  previewImg: $("#create-image-product-preview"),
};
previewLoadImg(args);
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
    const productName = capitalizeWord($("#product-name").val().trim());
    const productInfo = $("#product-keterangan").val();
    const productCategoryId = $("#product-refcategory-create").val();
    const productSupplierId = $("#product-refsupplier-create").val();
    const productPriceBuy = disFormatRupiah1($("#product-price-beli").val());
    const productPriceSell = disFormatRupiah1($("#product-price-jual").val());
    const productImg = document.getElementById("create-image-product").files;
    const req = {
      productName,
      productPriceBuy,
      productPriceSell,
      productInfo,
      productCategoryId,
      productSupplierId,
      productImg,
    };
    const { status, response } = await addProduct(req);
    if (status) {
      uiAlertSuccess(response);
      await getProductsAgain();
      await getProductRef();
      uiBlankVal();
      listProductRefPersediaanCreate();
      $("#productCreateModal").modal("hide");
    }
    if (!status) {
      uiAlertFailCreate(response);
      const modalBody = $("#productCreate-modal-body").get(0);
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.error(response);
    }
  });
