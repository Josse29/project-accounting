import { formatRupiah2 } from "../../utils/formatPrice.js";

const uiTr = (response) => {
  let tr = ``;
  response.forEach((rows) => {
    const expenseId = rows.ExpenseId;
    const expenseName = rows.ExpenseName;
    const expenseBalance = formatRupiah2(rows.ExpensePrice);
    const expenseImg = rows.ExpenseImg;
    const expenseInfo = rows.ExpenseInfo;
    const userId = rows.UserId;
    const userEmail = rows.UserEmail;
    const userFullname = rows.UserFullname;
    tr += `
    <tr
    data-expenseid="${expenseId}"
    data-expensename="${expenseName}"
    data-expenseprice="${expenseBalance}"
    data-expenseimg="${expenseImg}"
    data-expenseinfo="${expenseInfo}"
    data-userid="${userId}"
    data-useremail="${userEmail}"
    data-userfullname="${userFullname}"
    >
    <td class="text-center align-content-center">${expenseId}</td>
    <td class="pe-3 align-content-center text-truncate text-capitalize">
        ${expenseName}
    </td>
    <td class="pe-3 align-content-center text-truncate">${expenseBalance}</td>
    <td>
        <div class="d-flex w-100 justify-content-center gap-2">
        <button
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#expense-detail-modal"
        >
            <i class="fa fa-solid fa-eye"></i>
        </button>
        <button
            class="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#expense-update-modal"
        >
            <i class="fa fa-solid fa-pencil"></i>
        </button>
        <button
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#expense-delete-modal"
        >
            <i class="fa fa-solid fa-trash-can"></i>
        </button>
        </div>
    </td>
    </tr>
    `;
  });
  $("#expense-table tbody").html(tr);
};
// empty
const uiTr1 = (searchVal) => {
  const txt = "empty.....";
  const txt1 = `${searchVal} - not found .....`;
  const tr = `
  <tr>
    <td colspan="4" class="fst-italic text-center fw-bold">${
      searchVal === "" ? txt : txt1
    }</td>
  </tr>
  `;
  $("#expense-table tbody").html(tr);
  $("#expense-pagination").addClass("d-none");
};
// loading
const uiTr2 = () => {
  const tr = `
  <tr>
    <td colspan="4" class="fst-italic text-center fw-bold">loading....</td>
  </tr>
  `;
  $("p#expense-total-row").text(`Total : loading....`);
  $("#expense-table tbody").html(tr);
  $("#expense-pagination").addClass("d-none");
};
const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "expense-page-active" : "";
    btn += `
    <button class="btn border border-2 fs-6 ${actived}">
      ${i}
    </button>
    `;
  }
  $("#expense-number-page").html(btn);
  $("#expense-pagination").removeClass("d-none");
};
const uiBtnPageActive = (number) => {
  const btnPage = $("#expense-number-page button");
  btnPage.removeClass("expense-page-active");
  btnPage.eq(number - 1).addClass("expense-page-active");
};
const uiAlertSuccess = (res) => {
  const alert = `
  <div class="alert alert-success alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#expense-section div.alert-success").html(alert);
};
// for create
const uiAlertFail = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#expense-create-modal div.failed").html(alert);
};
// for update
const uiAlertFail1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#expense-update-modal div.failed").html(alert);
};
// for create
const uiReset = () => {
  $("input#expense-create-name").val("");
  $("input#expense-create-price").val("");
  $("input#expense-create-img").val("");
  $("div#expense-create-modal div#section-img").addClass("d-none");
  $("textarea#expense-create-info").val("");
  $("div#expense-create-modal div.failed").html("");
};
export {
  uiAlertSuccess,
  uiAlertFail,
  uiAlertFail1,
  uiReset,
  uiTr,
  uiTr1,
  uiTr2,
  uiBtnPage,
  uiBtnPageActive,
};
