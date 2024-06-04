export const uiTrCategory = (el) => {
  return `<tr>
            <td class="text-center align-content-center">${el.CategoryId}</td>
            <td class="text-nowrap align-content-center">
              ${el.CategoryName}
            </td>
            <td class="text-nowrap align-content-center">
              ${el.CategoryInfo}
            </td>
            <td>
              <div class="d-flex w-100 justify-content-center gap-2">
                <button class="btn btn-success text-white">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <button 
                  class="btn btn-primary text-white" 
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryModalEdit"
                  id="editCategory"
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
          </tr> `
}
export const uiListCategory = (el) => {
  return `<option value=${el.CategoryId}>${el.CategoryName}</option>`
}
export const successActionCategory = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                            ${res}
                          </div>`
  $("#sectionSuccessActionCategory").html(alertSuccessMe)
  setTimeout(() => {
    $("#sectionSuccessActionCategory").html("")
  }, 15000);
}