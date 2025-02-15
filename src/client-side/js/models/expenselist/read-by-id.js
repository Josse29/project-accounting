$("div#expense-table table tbody")
  .off("click", "button.btn-success")
  .on("click", "button.btn-success", function () {
    const expense = $(this).closest("tr")[0].dataset;
    const expenseName = expense.expensename;
    const expensePrice = expense.expenseprice;
    const expenseImg = expense.expenseimg;
    const expenseInfo = expense.expenseinfo ? expense.expenseinfo : "-";
    const userFullname = expense.userfullname;
    const userEmail = expense.useremail;

    const modalHeader = `
    <h3 class="modal-title text-white text-capitalize">${expenseName}</h3>
    `;
    $("#expense-detail-modal .modal-header").html(modalHeader);

    const modalBody = `
    <!-- expense name -->
    <div class="mb-3">
    <p class="fs-4 mb-1">Expense Name</p>
    <p class="fs-4 ms-2 mb-0 text-capitalize">${expenseName}</p>
    </div>
    <!-- expense balance -->
    <div class="mb-3">
    <p class="fs-4 mb-1">Expense Balance</p>
    <p class="fs-4 ms-2 mb-0 text-capitalize">${expensePrice}</p>
    </div>
    <!-- expense img -->
    <div class="mb-3">
    <p class="fs-4 mb-2">Expense Img</p>
    ${
      expenseImg !== "null"
        ? `<img src="${expenseImg}" alt="" class="w-100" />`
        : `<p class="fs-5 ms-2 mb-0 text-muted fst-italic">No Image Displayed....</p>`
    }
    </div>
    <!-- Expense Person  -->
    <div class="mb-3">
      <p class="fs-4 mb-1">Expense Person</p>
      ${
        userEmail !== "null"
          ? `
      <p class="fs-5 ms-2 mb-0">Fullname : ${userFullname}</p>
      <p class="fs-5 ms-2 mb-0">Email : ${userEmail}</p>
      `
          : `
      <p class="fs-5 ms-2 mb-0">-</p>
      `
      }
    </div>
    <!-- expense info -->
    <div class="mb-3">
    <p class="fs-4 mb-1">Expense Info</p>
    <p class="fs-5 ms-2 mb-0">${expenseInfo}</p>
    </div>
    `;
    $("#expense-detail-modal .modal-body").html(modalBody);
  });
