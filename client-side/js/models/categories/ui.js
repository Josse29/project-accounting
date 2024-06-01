export const uiTrCategory = (el) => {
  return `<tr>
            <td class="text-center align-content-center">${el.id}</td>
            <td class="text-nowrap align-content-center">
              ${el.category}
            </td>
            <td class="text-nowrap align-content-center">
              ${el.keterangan}
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
                  data-categoryid="${el.id}"
                  data-categorynama="${el.category}" 
                  data-categoryketerangan="${el.keterangan}"   
                  >
                    <i 
                    class="fa-solid fa-pencil" 
                    data-bs-toggle="tooltip" 
                    data-bs-html="true"
                    data-bs-title="<span>edit-${el.category}</span>" 
                    data-bs-placement="bottom">
                    </i>
                </button>
                <button 
                class="btn btn-danger text-white"
                data-bs-toggle="modal" 
                data-bs-target="#confirmDeleteCategoryModal"
                id="deleteCategory"
                data-categoryid="${el.id}"
                data-categorynama="${el.category}" 
                data-categoryketerangan="${el.keterangan}"
                >
                  <i 
                  class="fa-solid fa-trash-can"
                  data-bs-toggle="tooltip" 
                  data-bs-html="true"
                  data-bs-title="<span>hapus-${el.category}</span>" data-bs-placement="bottom"
                  ></i>
                </button>
              </div>
            </td>
          </tr> `
}
export const uiListCategory = (el) => {
  return `<option value=${el.id}>${el.category}</option>`
}