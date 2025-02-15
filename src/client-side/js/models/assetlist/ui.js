import { formatRupiah2 } from "../../utils/formatPrice.js";

const uiAlertFail = (res) => {
  const alert = `
    <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
      <strong class="text-capitalize">${res}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  $("div#assetCreateModal div#failed").html(alert);
};
const uiAlertFail1 = (res) => {
  const alert = `
    <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
      <strong class="text-capitalize">${res}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  $("div#asset-update-modal div.failed").html(alert);
};
const uiAlertSucceed = (res) => {
  const alert = `
    <div class="alert alert-success alert-dismissible fade show text-start" role="alert">
      <strong class="text-capitalize">${res}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  $("div#asset-section div#alertSuccess").html(alert);
};
const uiReset = () => {
  $("div#assetCreateModal input#asset-name").val("");
  $("div#assetCreateModal input#asset-price").val("");
  $("div#assetCreateModal input#asset-img").val("");
  $("div#assetCreateModal div#section-img").addClass("d-none");
  $("div#assetCreateModal textarea#asset-info").val("");
  $("div#assetCreateModal div#failed").html("");
  $("input#asset-search").val("");
  $("select#asset-limit").val(10);
};
const uiBtnPage = (totalPage) => {
  let btn = "";
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "asset-page-active" : "";
    btn += `<button 
            type="button"
            class="btn border border-2 fs-6 asset-page ${actived}">
              ${i}
            </button>`;
  }
  $("#asset-number-page").html(btn);
  $("#asset-pagination").removeClass("d-none");
};
const uiBtnPageActive = (number) => {
  const btnPage = $("button.asset-page");
  btnPage.removeClass("asset-page-active");
  btnPage.eq(number - 1).addClass("asset-page-active");
};
const uiTr = (response) => {
  let tr = ``;
  response.forEach((rows) => {
    const assetId = rows.AssetId;
    const assetName = rows.AssetName;
    const assetPrice = formatRupiah2(rows.AssetPrice);
    const assetImg = rows.AssetImg;
    const assetInfo = rows.AssetInfo;
    const userId = rows.UserId;
    const userEmail = rows.UserEmail;
    const userFullname = rows.UserFullname;
    tr += `
    <tr
      data-assetid="${assetId}"
      data-assetname="${assetName}"
      data-assetprice="${assetPrice}"
      data-assetimg="${assetImg}"
      data-assetinfo="${assetInfo}"
      data-userid="${userId}"
      data-useremail="${userEmail}"
      data-userfullname="${userFullname}"
    >
      <td class="text-center align-content-center">${assetId}</td>
      <td class="pe-3 align-content-center text-truncate text-capitalize">
        ${assetName}
      </td>
      <td class="pe-3 align-content-center text-truncate">${assetPrice}</td>
      <td>
        <div class="d-flex w-100 justify-content-center gap-2">
          <button
            class="btn btn-success text-white"
            data-bs-toggle="modal"
            data-bs-target="#asset-detail-modal"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
          <button 
            class="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#asset-update-modal"
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button 
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#asset-delete-modal"
            >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
    `;
  });
  $("div#asset-table tbody").html(tr);
};
// for empty assetname
const uiTr1 = (searchVal) => {
  const txt = "empty.....";
  const txt1 = `${searchVal} - not found ......`;
  const tr = `
  <tr>
    <td colspan="4" class="fst-italic text-center fw-bold">${
      searchVal === "" ? txt : txt1
    }</td>
  </tr>
  `;
  $("div#asset-table tbody").html(tr);
};
const uiTr2 = () => {
  const tr = `
  <tr>
    <td colspan="4" class="fst-italic text-center fw-bold">loading...</td>
  </tr>
  `;
  // totalRow
  $("p#assets-total-row").text(`Total : loading....`);
  $("div#asset-table tbody").html(tr);
  $("#asset-pagination").addClass("d-none");
};
// const uiTbod
export {
  uiAlertFail,
  uiAlertFail1,
  uiBtnPage,
  uiBtnPageActive,
  uiAlertSucceed,
  uiTr,
  uiTr1,
  uiTr2,
  uiReset,
};
