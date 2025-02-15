import { deleteAssetNameAPI } from "./services.js";
import { uiAlertSucceed } from "./ui.js";
import { getAssetNameAll } from "./utils.js";

$("div#asset-table tbody")
  .off("click", "button.btn-danger")
  .on("click", "button.btn-danger", function () {
    const asset = $(this).closest("tr")[0].dataset;
    const assetId = asset.assetid;
    const assetName = asset.assetname;
    // modalHeader
    const modalHeader = `
    <h3 class="modal-title text-white text-capitalize">${assetName}</h3>
    `;
    $("div#asset-delete-modal .modal-header").html(modalHeader);
    // modalBody
    const modalBody = `
    <i
    class="fa-solid fa-triangle-exclamation text-danger text-center d-block mb-3"
    style="font-size: 120px"
    ></i>
    <h4 class="text-center">
    Are you sure to delete - <span class="fw-bold text-capitalize">${assetName}</span>
    </h4>
    `;
    $("div#asset-delete-modal .modal-body").html(modalBody);
    // send to server
    $("div#asset-delete-modal .modal-footer button.btn-danger")
      .off("click")
      .on("click", async () => {
        const assetIdVal = assetId;
        const assetNameVal = assetName;
        const req = {
          assetIdVal,
          assetNameVal,
        };
        const { status, response } = await deleteAssetNameAPI(req);
        if (status) {
          getAssetNameAll();
          uiAlertSucceed(response);
          $("div#asset-delete-modal").modal("hide");
        }
        if (!status) {
          console.error(response);
          throw new Error(response);
        }
      });
  });
