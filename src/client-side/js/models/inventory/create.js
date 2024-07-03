import { createInventory } from "../../../../serverless-side/functions/inventory.js";
import { getInventoryAgain } from "./read.js";
import { createBlankValue, successActionInventory } from "./ui.js";

$(document).ready(function () {
  // function create increse or decrease qty
  let inventoryCreateQty = $("input#inventory-refproduct-create-qty").val();
  $("input#inventory-refproduct-create-qty").on("keyup", function () {
    inventoryCreateQty = $(this).val();
  });
  $("#inventoryqty-create-decrease").on("click", function () {
    inventoryCreateQty--;
    $("input#inventory-refproduct-create-qty").val(inventoryCreateQty);
  });
  $("#inventoryqty-create-increase").on("click", function () {
    inventoryCreateQty++;
    $("input#inventory-refproduct-create-qty").val(inventoryCreateQty);
  });
  // action to create inventory
  $("#inventory-create-submit")
    .off("click")
    .on("click", () => {
      const inventoryCreateProductName = $(
        "#inventory-refproduct-create-name"
      ).val();
      const inventoryCreateProductId = $(
        "input#inventory-refproduct-create-id"
      ).val();
      const inventoryCreateInfo = $("#inventory-create-info").val();
      const inventoryCreateQty = $(
        "input#inventory-refproduct-create-qty"
      ).val();
      createInventory(
        inventoryCreateProductName,
        inventoryCreateProductId,
        inventoryCreateInfo,
        inventoryCreateQty,
        (status, response) => {
          if (status) {
            successActionInventory(response);
            getInventoryAgain();
            createBlankValue();
          }
          if (!status) {
            console.error(response);
          }
        }
      );
    });
});
