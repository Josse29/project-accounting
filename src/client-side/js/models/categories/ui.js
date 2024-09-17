export const uiTrCategory = (el) => {
  return `<tr>
            <td class="text-center align-content-center">${el.CategoryId}</td>
            <td class="text-nowrap align-content-center text-capitalize">
              ${el.CategoryName}
            </td>
            <td>
              <div class="d-flex w-100 justify-content-center gap-2">
                <button 
                  class="btn btn-success text-white tooltip-bottom-container"
                  id="categoryDetailBtn"
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryDetailModal"
                  data-categoryid=${el.CategoryId}
                  data-categorynama=${el.CategoryName}" 
                  data-categoryketerangan="${el.CategoryInfo}">
                    <i class="fa-solid fa-eye"></i>
                    <span class="tooltip-bottom-text">See-${el.CategoryName}</span>
                </button>
                <button 
                  class="btn btn-primary text-white tooltip-bottom-container" 
                  id="editCategory"
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryModalEdit"
                  data-categoryid="${el.CategoryId}"
                  data-categorynama="${el.CategoryName}" 
                  data-categoryketerangan="${el.CategoryInfo}"   
                  >
                  <div class="tooltip-bottom-text">Update-${el.CategoryName}</div>
                  <i class="fa-solid fa-pencil"></i>
                </button>
                <button 
                class="btn btn-danger text-white tooltip-bottom-container"
                id="deleteCategory"
                data-bs-toggle="modal" 
                data-bs-target="#confirmDeleteCategoryModal"
                data-categoryid="${el.CategoryId}"
                data-categorynama="${el.CategoryName}" 
                data-categoryketerangan="${el.CategoryInfo}"
                >
                  <i class="fa-solid fa-trash-can"></i>
                 <div class="tooltip-bottom-text">Delete-${el.CategoryName}</div>
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
