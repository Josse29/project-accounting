import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { previewLoadImg } from "../../utils/loadImg.js";
import { listUserRefAssetCreate } from "../users/list.js";
import { createAssetNameAPI } from "./services.js";
import { uiAlertFail, uiAlertSucceed, uiReset } from "./ui.js";
import { getAssetNameAll } from "./utils.js";

// button#ass
$("div#asset-section button.btn-primary")
  .off("click")
  .on("click", async () => {
    await listUserRefAssetCreate();
  });
// Format as Rupiah when input
$("div#assetCreateModal input#asset-price")
  .off("input")
  .on("input", function () {
    let formattedValue = formatRupiah1($(this).val());
    $(this).val(formattedValue);
  });
// preview-image
const args = {
  inputImg: $("div#assetCreateModal input#asset-img"),
  sectionImg: $("div#assetCreateModal div#section-img"),
  previewImg: $("div#assetCreateModal div#section-img img"),
};
previewLoadImg(args);
// cancel img
$("div#assetCreateModal i#cancel-image")
  .off("click")
  .on("click", () => {
    $("div#assetCreateModal input#asset-img").val("");
    $("div#assetCreateModal div#section-img").addClass("d-none");
  });
// send to server
$("div#assetCreateModal button#asset-submit")
  .off("click")
  .on("click", async () => {
    const assetNameVal = $("div#assetCreateModal input#asset-name").val();
    const assetPriceVal = disFormatRupiah1(
      $("div#assetCreateModal input#asset-price").val()
    );
    const assetUserIdVal = $("div#assetCreateModal select#asset-userid").val();
    const assetImgVal = $("div#assetCreateModal input#asset-img")[0].files;
    const assetInfoVal = $("div#assetCreateModal textarea#asset-info").val();
    const req = {
      assetNameVal,
      assetPriceVal,
      assetUserIdVal,
      assetImgVal,
      assetInfoVal,
    };
    const { status, response } = await createAssetNameAPI(req);
    if (status) {
      getAssetNameAll();
      uiAlertSucceed(response);
      uiReset();
      $("div#assetCreateModal").modal("hide");
    }
    if (!status) {
      uiAlertFail(response);
      $("div#assetCreateModal div.modal-body").get(0).scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.error(response);
      throw new Error(response);
    }
  });
