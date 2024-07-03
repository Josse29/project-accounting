$(document).ready(function () {
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
});
