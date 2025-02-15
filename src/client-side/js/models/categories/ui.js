export const uiTbody = (response) => {
  let tr = "";
  response.forEach((el) => {
    const categoryId = parseInt(el.CategoryId);
    const categoryName = el.CategoryName;
    const categoryInfo = el.CategoryInfo;
    const categoryProductList = el.CategoryProductList;
    tr += `
    <tr
      data-categoryid="${categoryId}"
      data-categorynama="${categoryName}"
      data-categoryketerangan="${categoryInfo}"
      data-categoryproductlist="${categoryProductList}"
    >
      <td class="text-center align-content-center text-truncate pe-2">
        ${categoryId}
      </td>
      <td class="align-content-center text-capitalize text-truncate pe-2">
        ${categoryName}
      </td>
      <td class="align-content-center">
        <div class="d-flex w-100 justify-content-center gap-2">
          <button
            class="btn btn-success text-white"
            id="categoryDetailBtn"
            data-bs-toggle="modal"
            data-bs-target="#categoryDetailModal"
          >
            <i
              class="fa-solid fa-eye"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>See-${categoryName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            class="btn btn-primary text-white"
            id="editCategory"
            data-bs-toggle="modal"
            data-bs-target="#categoryModalEdit"
          >
            <i
              class="fa-solid fa-pencil"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Update-${categoryName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            class="btn btn-danger text-white"
            id="deleteCategory"
            data-bs-toggle="modal"
            data-bs-target="#confirmDeleteCategoryModal"
          >
            <i
              class="fa-solid fa-trash-can"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Delete-${categoryName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
        </div>
      </td>
    </tr>
    `;
  });
  $("#category-data").html(tr);
};
// when total category row 0 being seaching
export const uiTbodyEmpty = (searchVal) => {
  let search = `Category is empty....`;
  if (searchVal !== "") {
    search = `Category - ${searchVal} not found`;
  }
  const tr = `<tr>
                <td colspan="4" 
                class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
              </tr>`;
  $("#category-data").html(tr);
  $("div#category-pagination").addClass("d-none");
};
export const uiTbodyLoad = () => {
  const tr = `<tr>
                <td colspan="4" 
                class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Loading....</td>
              </tr>`;
  $("#category-data").html(tr);
  $("div#category-pagination").addClass("d-none");
};
export const uiBlankVal = () => {
  $("#category-nama").val("");
  $("#category-keterangan").val("");
};
// button pagination
export const uiBtnPage = (totalPage) => {
  let btnPage = "";
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "category-active-page" : "";
    btnPage += `<button 
                  type="button" 
                  class="category-btn-page ${actived}">
                  ${i}
                </button>`;
  }
  $("#category-number-page").html(btnPage);
  $("div#category-pagination").removeClass("d-none");
};
// Function to update active page button
export const uiBtnPageActive = (pageActive) => {
  $("button.category-btn-page").removeClass("category-active-page");
  $("button.category-btn-page")
    .eq(pageActive - 1)
    .addClass("category-active-page");
};
// alert
export const uiAlertSuccess = (res) => {
  const alertSuccessMe = `
  <div
    class="alert alert-success alert-dismissible fade show text-start"
    role="alert"
  >
    <strong class="text-capitalize">${res}</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  `;
  $("#sectionSuccessActionCategory").html(alertSuccessMe);
};
export const uiAlertFailCreate = (res) => {
  const alert = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#category-create-failed").html(alert);
};
export const uiAlertFailUpdate = (res) => {
  const alertFail = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#category-update-failed").html(alertFail);
};
