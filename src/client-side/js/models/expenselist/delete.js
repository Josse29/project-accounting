import { deleteExpenseAPI } from "./services.js";
import { uiAlertSuccess } from "./ui.js";
import { getExpenseAll } from "./utils.js";

$("div#expense-table table tbody")
  .off("click", "button.btn-danger")
  .on("click", "button.btn-danger", function () {
    const expense = $(this).closest("tr")[0].dataset;
    const expenseId = expense.expenseid;
    const expenseName = expense.expensename;
    const modalHeader = `
    <h3 class="modal-title text-white text-capitalize">${expenseName}</h3>
    `;
    $("#expense-delete-modal .modal-header").html(modalHeader);
    const modalBody = `
    <i
    class="fa-solid fa-triangle-exclamation text-danger text-center d-block mb-3"
    style="font-size: 120px"
    ></i>
    <h4 class="text-center">
    Are you sure to delete -
    <span class="fw-bold text-capitalize">${expenseName}</span>
    </h4>
    `;
    $("#expense-delete-modal .modal-body").html(modalBody);
    $("#expense-delete-modal .modal-footer .btn-danger")
      .off("click")
      .on("click", async () => {
        const expenseIdVal = expenseId;
        const expenseNameVal = expenseName;
        const req = {
          expenseIdVal,
          expenseNameVal,
        };
        const { status, response } = await deleteExpenseAPI(req);
        if (status) {
          await getExpenseAll();
          uiAlertSuccess(response);
          $("div#expense-delete-modal").modal("hide");
        }
        if (!status) {
          console.error(response);
          throw new Error(error);
        }
      });
  });
