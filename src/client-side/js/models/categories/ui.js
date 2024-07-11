export const uiTrCategory = (el) => {
  return `<tr>
            <td class="text-center align-content-center">${el.CategoryId}</td>
            <td class="text-nowrap align-content-center text-capitalize">
              ${el.CategoryName}
            </td>
            <td>
              <div class="d-flex w-100 justify-content-center gap-2">
                <button 
                  class="btn btn-success text-white"
                  id="categoryDetailBtn"
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryDetailModal"
                  data-categoryid="${el.CategoryId}"
                  data-categorynama="${el.CategoryName}" 
                  data-categoryketerangan="${el.CategoryInfo}" >
                  <i 
                    class="fa-solid fa-eye"
                    data-bs-toggle="tooltip" 
                    data-bs-html="true"
                    data-bs-title="<span>edit-${el.CategoryName}</span>" 
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
                    <i 
                    class="fa-solid fa-pencil" 
                    data-bs-toggle="tooltip" 
                    data-bs-html="true"
                    data-bs-title="<span>edit-${el.CategoryName}</span>" 
                    data-bs-placement="bottom">
                    </i>
                </button>
                <button 
                class="btn btn-danger text-white"
                data-bs-toggle="modal" 
                data-bs-target="#confirmDeleteCategoryModal"
                id="deleteCategory"
                data-categoryid="${el.CategoryId}"
                data-categorynama="${el.CategoryName}" 
                data-categoryketerangan="${el.CategoryInfo}"
                >
                  <i 
                  class="fa-solid fa-trash-can"
                  data-bs-toggle="tooltip" 
                  data-bs-html="true"
                  data-bs-title="<span>hapus-${el.CategoryName}</span>" data-bs-placement="bottom"
                  ></i>
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
export const uiTrZeroSearch = (categorySearch) => {
  return `<tr>
              <td colspan="4" 
              class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">kategori ${categorySearch} tidak ditemukan....</td>
          </tr>`;
};
// when total category row 0 being seaching
export const uiTrZero = () => {
  return `<tr>
              <td colspan="5" 
              class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada category....</td>
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
export const uiActivePageButton = (categoryPageNumber, categoryBtnPage) => {
  const categoryBtnPageActive = document.getElementsByClassName(
    "category-active-page"
  );
  if (categoryBtnPageActive.length >= 1) {
    categoryBtnPageActive[0].classList.remove("category-active-page");
  }
  categoryBtnPage[categoryPageNumber - 1].classList.add("category-active-page");
};
export const uiCategoryListProductCreate = (categoryList) => {
  let option = "";
  categoryList.forEach((el) => {
    option += `<div class='product-refcategory-val fs-6' value='${el.CategoryId}'>${el.CategoryName}</div>`;
  });
  $(".product-refcategory-list").html(option);
  // Re-bind click event to new elements
  $(".product-refcategory-val").on("click", function () {
    $("#product-refcategory-create-val").val($(this).attr("value"));
    $("#product-refcategory-create").val(this.textContent);
    $(".product-refcategory-list").hide();
  });
};
export const uiCategoryListProductUpdate = (categoryList) => {
  let option = "";
  categoryList.forEach((el) => {
    option += `<div class='product-refcategory-val-update fs-6' value='${el.CategoryId}'>${el.CategoryName}</div>`;
  });
  $(".product-refcategory-update-list").html(option);
  // Re-bind click event to new elements
  $(".product-refcategory-val-update").on("click", function () {
    $("#product-refcategory-update-val").val($(this).attr("value"));
    $("#product-refcategory-update").val(this.textContent);
    $(".product-refcategory-update-list").hide();
  });
};
