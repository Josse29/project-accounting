export const uiTbody = (response) => {
  let tr = ``;
  response.forEach((el) => {
    const userId = el.UserId;
    const userEmail = el.UserEmail;
    const userFullname = el.UserFullname;
    const userPosition = el.UserPosition;
    const userImg = el.UserImg;
    const userInfo = el.UserInfo;
    tr += `
    <tr
      data-userid="${userId}"
      data-useremail="${userEmail}"
      data-userfullname="${userFullname}"
      data-userposition="${userPosition}"
      data-userimg="${userImg}"
      data-userinfo="${userInfo}"
    >
      <td class="text-center align-content-center text-truncate pe-3">
        ${userId}
      </td>
      <td class="text-capitalize align-content-center text-truncate pe-3">
        ${userFullname}
      </td>
      <td class="align-content-center text-truncate pe-3">${userEmail}</td>
      <td class="text-capitalize align-content-center text-truncate pe-3">
        ${userPosition}
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
              data-bs-title="<span>See-${userFullname}</span>"
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
              data-bs-title="<span>Update-${userFullname}</span>"
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
              data-bs-title="<span>Delete-${userFullname}</span>"
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
  const alert = `
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
  $("#section-user #crud-success").html(alert);
};
export const uiReset = () => {
  $("#user-create #useremail").val("");
  $("#user-create #userfullname").val("");
  $("#user-create #userposition").val("Open this select position");
  $("#user-create #userpassword").val("");
  $("#user-create #userpassword1").val("");
  $("#user-create input#userimg").val("");
  $("#user-create textarea#userinfo").val("");
  $("#user-create #section-img").addClass("d-none");
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
export const uiAlertFailCreate = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                    <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                 </div>`;
  $("#supplier-create-failed").html(alert);
};
export const uiAlertSuccess1 = (res) => {
  const alertSuccessMe = `<div class="alert alert-success alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong> 
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
  $("#sectionSuccessActionSupply").html(alertSuccessMe);
};
export const uiBlankVal = () => {
  $("#supplier-create-name").val("");
  $("#supplier-create-img").val("");
  $("#supplier-create-info").val("");
  $("#supplier-create-img-section").addClass("d-none");
};
