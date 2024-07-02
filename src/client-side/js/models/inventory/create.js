import { createInventory } from "../../../../serverless-side/functions/inventory.js";
import { getInventoryAgain } from "./read.js";
import { successActionInventory } from "./ui.js";

$(document).ready(function () {
  $("#inventory-create-submit").on("click", () => {
    const inventoryCreateProductId = $(
      "input#inventory-refproduct-create-id"
    ).val();
    const inventoryCreateInventoryInfo = $("#inventory-create-info").val();
    createInventory(
      inventoryCreateProductId,
      inventoryCreateInventoryInfo,
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
