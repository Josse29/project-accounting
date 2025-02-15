import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { getImageBase64, validateImg } from "../../utils/loadImg.js";
import { listUserRefAssetUpdate } from "../users/list.js";
import { updateAsetNameAPI } from "./services.js";
import { uiAlertFail1, uiAlertSucceed } from "./ui.js";
import { getAssetNameAll } from "./utils.js";

$("div#asset-table tbody")
  .off("click", "button.btn-primary")
  .on("click", "button.btn-primary", async function () {
    // 1.getAllData
    const asset = $(this).closest("tr")[0].dataset;
    const assetName = asset.assetname;
    const assetPrice = asset.assetprice;
    const assetImg = asset.assetimg;
    const assetInfo = asset.assetinfo;
    const userId = parseInt(asset.userid);
    // 2.modalHeader
    $(".modal-content .modal-header h3").text(assetName);
    // 3.getValue
    await listUserRefAssetUpdate(userId);
    $("input#asset-update-name").val(assetName);
    $("input#asset-update-price").val(assetPrice);
    $("input#asset-update-info").val(assetInfo);
    // section-img
    if (assetImg !== "null") {
      $("#asset-update-modal #section-img img").attr("src", assetImg);
      $("#asset-update-modal #section-img").show();
    }
    if (assetImg === "null") {
      $("#asset-update-modal #section-img").hide();
    }
    // formatted currency
    $("input#asset-update-price")
      .off("input")
      .on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
    // preview img
    let assetImgCancelVal = false;
    $("input#asset-update-img")
      .off("change")
      .on("change", async (event) => {
        try {
          const target = event.target.files;
          const validate = validateImg(target);
          if (validate) {
            const imgbase64 = await getImageBase64(target[0]);
            $("#asset-update-modal #section-img img").attr("src", imgbase64);
            $("#asset-update-modal #section-img").show();
          }
          if (!validate) {
            $("#asset-update-modal #section-img").hide();
          }
          assetImgCancelVal = false;
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      });
    // cancel img
    $("#asset-update-modal #section-img i#cancel-image")
      .off("click")
      .on("click", function () {
        assetImgCancelVal = true;
        $("input#asset-update-img").val("");
        $("#asset-update-modal #section-img").hide();
      });
    // send to server
    $("div#asset-update-modal .modal-dialog .modal-footer button.btn-primary")
      .off("click")
      .on("click", async () => {
        const assetIdVal = asset.assetid;
        const assetNameVal = $("input#asset-update-name").val();
        const assetPriceVal = disFormatRupiah1(
          $("input#asset-update-price").val()
        );
        const assetUserIdVal = $("select#asset-update-userid").val();
        const assetInfoVal = $("textarea#asset-update-info").val();
        const assetImgVal = $("input#asset-update-img")[0].files;
        const req = {
          assetIdVal,
          assetNameVal,
          assetPriceVal,
          assetUserIdVal,
          assetImgVal,
          assetInfoVal,
          assetImgCancelVal,
        };

        const { status, response } = await updateAsetNameAPI(req);
        if (status) {
          $("input#asset-update-img").val("");
          getAssetNameAll();
          uiAlertSucceed(response);
          $("div#asset-update-modal").modal("hide");
        }
        if (!status) {
          uiAlertFail1(response);
          $("div#asset-update-modal div.modal-body").get(0).scrollTo({
            top: 0,
            behavior: "smooth",
          });
          console.error(response);
          throw new Error(response);
        }
      });
  });
