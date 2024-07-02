import { deleteInventory } from "../../../../serverless-side/functions/inventory.js";
import { getInventoryAgain } from "./read.js";
import { successActionInventory } from "./ui.js";

$(document).ready(function () {
  $(document).on("click", "#inventory-delete-btn", function () {
    const inventory = this.dataset;
    $("#inventory-delete-label").text(inventory.inventoryproduct);
    const konfirmasiDelete = `Apakah anda yakin menghapus - stock ${inventory.inventoryproduct} pada <span class="fw-bold">Tanggal : ${inventory.inventorydate} Waktu ${inventory.inventorysecond} </span>  ?`;
    $("#confirm-text").html(konfirmasiDelete);
    $("#inventory-delete-yes")
      .off("click")
      .on("click", function () {
        deleteInventory(
          parseInt(inventory.inventoryid),
          inventory.inventoryproduct,
          (status, response) => {
            if (status) {
              successActionInventory(response);
              getInventoryAgain();
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      });
  });
});
