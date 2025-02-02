import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { previewLoadImg } from "../../utils/loadImg.js";
import { getCashAll } from "../cash/utils.js";
import { listUserRefAccountingCreate } from "../users/list.js";
import { addAccounting1 } from "./services.js";
import { uiAlertFailed3, uiAlertSuccess } from "./ui.js";
import { getAccountingAll } from "./utils.js";

// increase cash  =
// 1. a receipt of investor with cash
// 2. a receipt of sales with cash
// 3. a receipt of payable / debt with cash
// 4. a receipt of return purchasement account purchase with cash
// 4. a receipt of return purchasement expenses with cash
// 5. a receipt of receivable with cash

// decrease cash =
// 1. a prive of investor with cash
// 2. a payment of return sales with cash
// 3. a payment of payable / debt with cash
// 4. a payment of purchasement account purchase with cash
// 5. a payment of purchasement expenses with cash
// 6. a payment of dividend

// payable =
// + : [receivable cash from creditors, purchasement asset/purchase/expenses with credit ]
// - : [payment to creditors]
// receivable
//  + : [sales with credit]
// - : [payment from customers who purchase with credit]

// Format as Rupiah when input
$("div#accountingCashInModal input#cashin_price")
  .off("input")
  .on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
// hide other value
$("div#cashin_other_value").hide();
// choose the method and others value
$("select#cashin_method")
  .off("change")
  .on("change", async function () {
    const selectedMethod = $(this).val();
    // 1.invest
    if (selectedMethod === "invest") {
      await listUserRefAccountingCreate();
      $("div#cashin_other_value").show();
      $("div#user_investor").show();
    }
    // 2. sale
    // 3. payable
    // 4. receivable
  });
// preview-image
const args = {
  inputImg: $("div#accountingCashInModal input#cashin_img"),
  sectionImg: $("div#accountingCashInModal div#section_img"),
  previewImg: $("div#accountingCashInModal img#preview_img"),
};
previewLoadImg(args);
$("div#accountingCashInModal i#cancel_img")
  .off("click")
  .on("click", () => {
    $("div#accountingCashInModal input#cashin_img").val("");
    $("div#accountingCashInModal div#section_img").addClass("d-none");
  });
// send to server
$("div#accountingCashInModal button#cashin_create")
  .off("click")
  .on("click", async () => {
    const accountingDate = $("input#cashin_date").val();
    const accountingTime = $("input#cashin_time").val();
    const accountingMethod = $("select#cashin_method").val();
    const accountingRefInvestor = $("select#investor").val();
    const accountingRefInvestor1 = $("#investor option:selected").text();
    const accountingPrice = disFormatRupiah1($("input#cashin_price").val());
    const accountingImg = $("input#cashin_img")[0].files;
    const accountingInfo = $("textarea#cashin_info").val();
    const req = {
      accountingDate,
      accountingTime,
      accountingMethod,
      accountingRefInvestor,
      accountingRefInvestor1,
      accountingPrice,
      accountingImg,
      accountingInfo,
    };
    const { status, response } = await addAccounting1(req);
    if (status) {
      await getAccountingAll();
      await getCashAll();
      uiAlertSuccess(response);
      $("#accountingCashInModal").modal("hide");
    }
    if (!status) {
      uiAlertFailed3(response);
      const modalBody = $(
        "#accountingCashInModal .modal-content .modal-body"
      ).get(0);
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      throw new Error(response);
    }
  });
