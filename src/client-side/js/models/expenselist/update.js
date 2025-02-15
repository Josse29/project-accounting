import { updateExpenseAPI } from "./services.js";

import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { getImageBase64, validateImg } from "../../utils/loadImg.js";
import { getExpenseAll } from "./utils.js";
import { uiAlertFail1, uiAlertSuccess } from "./ui.js";
import { listUserRefExpenseUpdate } from "../users/list.js";

$("div#expense-table table tbody")
  .off("click", "button.btn-primary")
  .on("click", "button.btn-primary", async function () {
    // 1.all-data
    const expense = $(this).closest("tr")[0].dataset;
    const expenseId = expense.expenseid;
    const expenseName = expense.expensename;
    const expenseprice = expense.expenseprice;
    const expenseImg = expense.expenseimg;
    const expenseInfo = expense.expenseinfo;
    const userid = parseInt(expense.userid);
    // list supplier
    await listUserRefExpenseUpdate(userid);
    // 2.modalHeader
    const modalHeader = `
    <h3 class="modal-title text-white text-capitalize">${expenseName}</h3>
    `;
    $("#expense-update-modal .modal-header").html(modalHeader);
    // 3.value
    $("input#expense-update-name").val(expenseName);
    $("input#expense-update-price").val(expenseprice);
    $("textarea#expense-update-info").val(expenseInfo);
    if (expenseImg !== "null") {
      $("#expense-update-modal #section-img img").attr("src", expenseImg);
      $("#expense-update-modal #section-img").show();
    }
    if (expenseImg === "null") {
      $("#expense-update-modal #section-img").hide();
    }
    // 4.formattedCurrency
    $("input#expense-update-price")
      .off("keyup")
      .on("keyup", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
    // 5.previewImg
    let imgCancel = false;
    $("input#expense-update-img")
      .off("change")
      .on("change", async (event) => {
        try {
          const target = event.target.files;
          const validate = validateImg(target);
          if (validate) {
            const imgBase64 = await getImageBase64(target[0]);
            $("#expense-update-modal #section-img img").attr("src", imgBase64);
            $("#expense-update-modal #section-img").show();
          }
          if (!validate) {
            $("#expense-update-modal #section-img").hide();
          }
          imgCancel = false;
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      });
    // 6.cancelImg
    $("#expense-update-modal #section-img i#cancel-image")
      .off("click")
      .on("click", function () {
        imgCancel = true;
        $("input#expense-update-img").val("");
        $("#expense-update-modal #section-img ").hide();
      });
    // 7.send to server
    $("#expense-update-modal .modal-footer button.btn-primary")
      .off("click")
      .on("click", async () => {
        const expenseIdVal = expenseId;
        const expenseNameVal = $("input#expense-update-name").val();
        const expensePriceVal = disFormatRupiah1(
          $("input#expense-update-price").val()
        );
        const expenseUserIdVal = $("select#expense-update-user-id").val();
        const expenseInfoVal = $("textarea#expense-update-info").val();
        const expenseImgVal = $("input#expense-update-img")[0].files;
        const expenseImgCancelVal = imgCancel;
        const req = {
          expenseIdVal,
          expenseNameVal,
          expensePriceVal,
          expenseUserIdVal,
          expenseInfoVal,
          expenseImgVal,
          expenseImgCancelVal,
        };
        const { status, response } = await updateExpenseAPI(req);
        if (status) {
          await getExpenseAll();
          $("input#expense-update-img").val("");
          uiAlertSuccess(response);
          $("div#expense-update-modal").modal("hide");
        }
        if (!status) {
          uiAlertFail1(response);
          $("div#expense-update-modal div.modal-body").get(0).scrollTo({
            top: 0,
            behavior: "smooth",
          });
          console.error(response);
          throw new Error(response);
        }
      });
  });
