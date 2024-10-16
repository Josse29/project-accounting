import { getTimeNow } from "../../utils/formatWaktu.js";
import { uiBlankValue, uiAlertFailCreate, uiAlertSuccess } from "./ui.js";
import { listProductRefPersediaanCreate } from "../products/list.js";
import { getPersediaanAgain } from "./read.js";
import { create, getSumQty } from "./services.js";

// 1.init-ui-modal-create
$("button#btnpersediaanModal")
  .off("click")
  .on("click", function () {
    listProductRefPersediaanCreate();
    $("#sectionFailedActionPersediaan").html("");
    $("input#persediaan-create-qty").val(0);
    persediaanCreateQty = 0;
    $("div#persediaan-create-stock").addClass("d-none");
  });
// 2.function-increase-decrease-qty
let persediaanCreateQty = $("input#persediaan-create-qty").val();
$("button#persediaan-create-decrease")
  .off("click")
  .on("click", function () {
    persediaanCreateQty--;
    $("input#persediaan-create-qty").val(persediaanCreateQty);
  });
$("input#persediaan-create-qty")
  .off("keyup")
  .on("keyup", function () {
    persediaanCreateQty = $(this).val();
  });
$("button#persediaan-create-increase")
  .off("click")
  .on("click", function () {
    persediaanCreateQty++;
    $("input#persediaan-create-qty").val(persediaanCreateQty);
  });
// 3.get product id, product Name, price buy, qty from select list product
$("select#persediaan-refproduct-search-name")
  .off("change")
  .on("change", async function () {
    const selectedOption = $(this).find("option:selected");
    const productId = parseInt($(this).val());
    const productName = selectedOption.text();
    const pricebuy = selectedOption.data("pricebuy");
    const qty = await getSumQty(productId);
    const qtyStatus = qty.status;
    const qtyResponse = qty.response;
    if (qtyStatus) {
      $("p#persediaan-create-product-qty").text(qtyResponse);
      $("input#persediaan-refproduct-create-id").val(productId);
      $("#persediaan-refproduct-create-name").val(productName);
      $("input#persediaan-refproduct-create-rp").val(pricebuy);
      $("div#persediaan-create-stock").removeClass("d-none");
    }
    if (!qtyStatus) {
      console.error(qtyResponse);
    }
  });
// req-to-db
$("#persediaan-create-submit")
  .off("click")
  .on("click", async () => {
    const { formattedDDMY, formattedHMS } = getTimeNow();
    const valProductName = $("#persediaan-refproduct-create-name").val();
    const valPersediaanDDMY = formattedDDMY;
    const valPersediaanHMS = formattedHMS;
    const valPersediaanProductId = parseInt(
      $("input#persediaan-refproduct-create-id").val()
    );
    const valProductIdPrice = parseFloat(
      $("input#persediaan-refproduct-create-rp").val()
    );
    const valPersediaanQty = parseFloat($("input#persediaan-create-qty").val());
    const valPersediaanTotalRp = valPersediaanQty * valProductIdPrice;
    const valPersediaanInfo = $("#persediaan-create-info").val();
    const req = {
      valProductName,
      valPersediaanDDMY,
      valPersediaanHMS,
      valPersediaanProductId,
      valPersediaanQty,
      valPersediaanTotalRp,
      valPersediaanInfo,
    };
    const created = await create(req);
    const createdStatus = created.status;
    const createdRes = created.response;
    if (createdStatus) {
      getPersediaanAgain();
      uiAlertSuccess(createdRes);
      uiBlankValue();
      persediaanCreateQty = 0; //hufft
      $("#persediaanCreateModal").modal("hide");
    }
    if (!createdStatus) {
      uiAlertFailCreate(createdRes);
      const modalBody = $("#persediaan-create-modal-body").get(0);
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
