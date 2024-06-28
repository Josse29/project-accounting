//  ui tr satuan from looping
export const trSatuan = (el) => {
  return `<tr>
            <td class="text-center align-content-center">${el.SatuanId}</td>
            <td class="text-nowrap align-content-center text-capitalize">${el.SatuanName}</td>
            <td>
              <div class="d-flex w-100 justify-content-center gap-2">
                <button 
                  id="satuanDetail" 
                  class="btn btn-success text-white"
                  data-bs-toggle="modal" 
                  data-bs-target="#satuanModalDetail" 
                  data-satuanid="${el.SatuanId}"  
                  data-satuanname="${el.SatuanName}"
                  data-satuaninfo="${el.SatuanInfo}">
                    <i class="fa-solid fa-eye"
                       data-bs-toggle="tooltip" 
                       data-bs-html="true"
                       data-bs-title="<span>lihat-${el.SatuanName}</span>" 
                       data-bs-placement="bottom">
                    </i>
                </button>
                <button 
                  id="satuanEdit" 
                  class="btn btn-primary text-white"
                  data-bs-toggle="modal" 
                  data-bs-target="#satuanUpdateModal" 
                  data-satuanid="${el.SatuanId}"  
                  data-satuanname="${el.SatuanName}"
                  data-satuaninfo="${el.SatuanInfo}">
                    <i class="fa-solid fa-pencil"
                       data-bs-toggle="tooltip" 
                       data-bs-html="true"
                       data-bs-title="<span>edit-${el.SatuanName}</span>" 
                       data-bs-placement="bottom">
                    </i>
                </button>
                <button 
                  id="satuanDelete"
                  class="btn btn-danger text-white"
                  data-bs-toggle="modal" 
                  data-bs-target="#satuanDeleteModal" 
                  data-satuanid="${el.SatuanId}"  
                  data-satuanname="${el.SatuanName}"
                  data-satuaninfo="${el.SatuanInfo}">
                  <i class="fa-solid fa-trash-can"
                    data-bs-toggle="tooltip" 
                    data-bs-html="true"
                    data-bs-title="<span>delete-${el.SatuanName}</span>" 
                    data-bs-placement="bottom">
                  </i>
                </button>
              </div>
            </td>
          </tr>`;
};
// make alert success after action crud
export const successActionSatuan = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`;
  $("#sectionSuccessActionSatuan").html(alertSuccessMe);
  setTimeout(() => {
    $("#sectionSuccessActionSatuan").html("");
  }, 20000);
};
// when total satuan row 0 being seaching
export const uiTrZeroSearch = (satuanSearch) => {
  return `<tr>
              <td colspan="3" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">kategori ${satuanSearch} tidak ditemukan....</td>
            </tr>`;
};
// when total satuan row 0 being seaching
export const uiTrZero = () => {
  return `<tr>
              <td colspan="3" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada satuan....</td>
            </tr>`;
};
export const valueBlank = () => {
  $("#create-satuan-name").val("");
  $("#create-satuan-keterangan").val("");
};
// button pagination
export const btnSatuanPage = (i) => {
  return `<button 
           type="button" 
           class="satuan-btn-page ${i === 1 ? "satuan-active-page" : ""}">
            ${i}
          </button>`;
};
// function active ui button
export const uiActivePageButton = (satuanActivePage, satuanBtnPage) => {
  const satuanBtnPageActive =
    document.getElementsByClassName("satuan-active-page");
  if (satuanBtnPageActive.length >= 1) {
    satuanBtnPageActive[0].classList.remove("satuan-active-page");
  }
  satuanBtnPage[satuanActivePage - 1].classList.add("satuan-active-page");
};
