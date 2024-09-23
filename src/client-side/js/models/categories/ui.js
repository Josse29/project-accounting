export const uiTrCategory = (el) => {
  return `<tr>
            <td class="text-center align-content-center text-truncate pe-2">${el.CategoryId}</td>
            <td class="align-content-center text-capitalize text-truncate pe-2">
              ${el.CategoryName}
            </td>
            <td class="align-content-center">
              <div class="d-flex w-100 justify-content-center gap-2">
                <button 
                  class="btn btn-success text-white"
                  id="categoryDetailBtn"
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryDetailModal"
                  data-categoryid=${el.CategoryId}
                  data-categorynama="${el.CategoryName}" 
                  data-categoryketerangan="${el.CategoryInfo}">
                    <i class="fa-solid fa-eye"
                       data-bs-toggle="tooltip" 
                       data-bs-html="true"
                       data-bs-title="<span>See-${el.CategoryName}</span>" 
                       data-bs-placement="bottom"></i>
                </button>
                <button 
                  class="btn btn-primary text-white" 
                  id="editCategory"
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryModalEdit"
                  data-categoryid="${el.CategoryId}"
                  data-categorynama="${el.CategoryName}" 
                  data-categoryketerangan="${el.CategoryInfo}"   
                  >
                  <i class="fa-solid fa-pencil"
                     data-bs-toggle="tooltip" 
                     data-bs-html="true"
                     data-bs-title="<span>Update-${el.CategoryName}</span>" 
                     data-bs-placement="bottom"></i>
                </button>
                <button 
                class="btn btn-danger text-white"
                id="deleteCategory"
                data-bs-toggle="modal" 
                data-bs-target="#confirmDeleteCategoryModal"
                data-categoryid="${el.CategoryId}"
                data-categorynama="${el.CategoryName}" 
                data-categoryketerangan="${el.CategoryInfo}"
                >
                  <i class="fa-solid fa-trash-can"
                     data-bs-toggle="tooltip" 
                     data-bs-html="true"
                     data-bs-title="<span>Delete-${el.CategoryName}</span>" 
                     data-bs-placement="bottom"></i>
                </button>
              </div>
            </td>
          </tr> `;
};
export const successActionCategory = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                            ${res}
                          </div>`;
  $("#sectionSuccessActionCategory").html(alertSuccessMe);
  setTimeout(() => {
    $("#sectionSuccessActionCategory").html("");
  }, 15000);
};
export const createBlankValue = () => {
  $("#category-nama").val("");
  $("#category-keterangan").val("");
};
// when total category row 0 being seaching
export const uiTrZero = (searchVal) => {
  let search = `Category is empty....`;
  if (searchVal !== "") {
    search = `Category - ${searchVal} not found`;
  }
  return `<tr>
              <td colspan="4" 
              class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
          </tr>`;
};
// button pagination
export const uiBtnPage = (i) => {
  return `<button 
            type="button" 
            class="category-btn-page ${i === 1 ? "category-active-page" : ""}">
              ${i}
          </button>`;
};
// Function to update active page button
export const uiActivePageButton = (pageActive) => {
  $("button.category-btn-page").removeClass("category-active-page");
  $("button.category-btn-page")
    .eq(pageActive - 1)
    .addClass("category-active-page");
};
export const uiListRefProductUpdate = (categoryList) => {
  let option = "";
  categoryList.forEach((el) => {
    option += `<div class='product-refcategory-val-update fs-6' value='${el.CategoryId}'>${el.CategoryName}</div>`;
  });
  $(".product-refcategory-update-list").html(option);
};
export const uiCreateFailed = (res) => {
  const alertFail = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#category-create-failed").html(alertFail);
};
export const uiUpdateFailed = (res) => {
  const alertFail = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#category-update-failed").html(alertFail);
};
