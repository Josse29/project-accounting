export const uiTbody = (response) => {
  let tr = ``;
  response.forEach((el) => {
    tr += `
    <tr
      data-userid="${el.UserId}"
      data-useremail="${el.UserEmail}"
      data-userfullname="${el.UserFullname}"
      data-userposition="${el.UserPosition}"
      data-userimg="${el.UserImg}"
    >
      <td class="text-center align-content-center text-truncate pe-3">
        ${el.UserId}
      </td>
      <td class="text-capitalize align-content-center text-truncate pe-3">
        ${el.UserFullname}
      </td>
      <td class="align-content-center text-truncate pe-3">${el.UserEmail}</td>
      <td class="text-capitalize align-content-center text-truncate pe-3">
        ${el.UserPosition}
      </td>
      <td class="align-content-center">
        <div class="d-flex gap-2 justify-content-center">
          <button
            class="btn btn-success text-white"
            id="user-detail"
            data-bs-toggle="modal"
            data-bs-target="#user-detail-modal"
          >
            <i
              class="fa-solid fa-eye"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>See-${el.UserFullname}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            class="btn btn-primary text-white"
            id="user-update"
            data-bs-toggle="modal"
            data-bs-target="#user-update-modal"
          >
            <i
              class="fa-solid fa-pencil"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Update-${el.UserFullname}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#user-delete-modal"
            id="user-delete"
          >
            <i
              class="fa-solid fa-trash-can"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Delete-${el.UserFullname}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
        </div>
      </td>
    </tr>`;
  });
  $("tbody#user").html(tr);
};
export const uiTbodyEmpty = (searchVal) => {
  let search = `empty....`;
  if (searchVal !== "") {
    search = `${searchVal} - not found `;
  }
  const tr = `<tr>
                <td class="text-center fst-italic text-center fw-bold" colspan="5">
                  ${search}
                </td>
              </tr>`;
  $("tbody#user").html(tr);
  $("div#user-pagination").addClass("d-none");
};
export const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "user-page-active" : "";
    btn += `<button type="button"
              class="btn border border-2 fs-6 ${actived}">
              ${i}
            </button> `;
  }
  $("#user-page-number").html(btn);
  $("div#user-pagination").removeClass("d-none");
};
export const uiBtnPageActive = (page) => {
  const btnPage = $("#user-page-number button");
  $(btnPage).removeClass("user-page-active");
  $(btnPage)
    .eq(page - 1)
    .addClass("user-page-active");
};
export const uiAlertFail = (res) => {
  const alert = `<div class="alert alert-danger alert-dismissible fade show text-start"
                      role="alert">
                  <strong class="text-capitalize">${res}</strong>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>`;
  return alert;
};
export const uiAlertSuccess = (res) => {
  const alert = `<div class="alert alert-success alert-dismissible fade show text-start"
                      role="alert">
                  <strong class="text-capitalize">${res}</strong>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>`;
  return alert;
};
export const uiReset = () => {
  $("#user-create #useremail").val("");
  $("#user-create #userfullname").val("");
  $("#user-create #userposition").val("");
  $("#user-create #userpassword").val("");
  $("#user-create #userpassword1").val("");
  $("#user-create input#userimg").val("");
};
export const uiLoad = () => {
  const tr = `<tr>
                <td class="text-center fst-italic fw-bold" colspan="5">
                  loading....
                </td>
              </tr>`;
  $("tbody#user").html(tr);
  $("div#user-pagination").addClass("d-none");
};
