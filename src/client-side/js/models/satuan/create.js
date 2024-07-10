import { createSatuan } from "../../../../serverless-side/functions/satuan.js";
import { getSatuanAgain } from "./read.js";
import { successActionSatuan, valueBlank } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
$(document).ready(function () {
  // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
  $("#product-create-submit").off("click");
  // event submit create product
  $("#product-create-submit").on("click", () => {
    const satuanName = capitalizeWord($("#create-satuan-name").val());
    const satuanInfo = $("#create-satuan-keterangan").val();
    createSatuan(satuanName, satuanInfo, (status, response) => {
      if (status) {
        successActionSatuan(response);
        getSatuanAgain();
        valueBlank();
      }
      if (!status) {
        console.log(response);
      }
    });
  });
});
