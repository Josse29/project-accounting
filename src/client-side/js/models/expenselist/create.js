import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { previewLoadImg } from "../../utils/loadImg.js";
import { listUserRefExpenseCreate } from "../users/list.js";
import { createExpenseAPI } from "./services.js";
import { uiAlertFail, uiAlertSuccess, uiReset } from "./ui.js";
import { getExpenseAll } from "./utils.js";

// expense-create-modal
$("div#expense-section .card-body button.btn-primary")
  .off("click")
  .on("click", async () => {
    await listUserRefExpenseCreate();
  });
// format to curreency
$("input#expense-create-price")
  .off("input")
  .on("input", function () {
    let formatCurrency = formatRupiah1($(this).val());
    $(this).val(formatCurrency);
  });
// preview-image
const args = {
  inputImg: $("input#expense-create-img"),
  sectionImg: $("#expense-create-modal #section-img"),
  previewImg: $("#expense-create-modal div#section-img img"),
};
previewLoadImg(args);
// cancel img
$("#expense-create-modal i#cancel-image")
  .off("click")
  .on("click", () => {
    $("input#expense-create-img").val("");
    $("#expense-create-modal div#section-img").addClass("d-none");
  });
// send to server
$("#expense-create-modal .modal-footer .btn-primary")
  .off("click")
  .on("click", async () => {
    const expenseNameVal = $("input#expense-create-name").val();
    const expensePriceVal = disFormatRupiah1(
      $("input#expense-create-price").val()
    );
    const expenseUserIdVal = $("select#expense-user-id").val();
    const expenseImgVal = $("input#expense-create-img")[0].files;
    const expenseInfoVal = $("textarea#expense-create-info").val();
    const req = {
      expenseNameVal,
      expensePriceVal,
      expenseUserIdVal,
      expenseImgVal,
      expenseInfoVal,
    };
    const { status, response } = await createExpenseAPI(req);
    if (status) {
      await getExpenseAll();
      uiAlertSuccess(response);
      uiReset();
      $("div#expense-create-modal").modal("hide");
    }
    if (!status) {
      uiAlertFail(response);
      $("div#expense-create-modal div.modal-body").get(0).scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.error(response);
      throw new Error(response);
    }
  });
