$(document).ready(function () {
  $(document).on("click", "#inventory-update-btn", function () {
    listProductRefInventoryUpdate();
    const inventory = this.dataset;
    console.log(inventory.inventoryinfo);
    $("#inventory-update-label").text(inventory.inventoryproductname);
    $("#inventory-update-date").text(inventory.inventorydate);
    $("#inventory-update-second").text(inventory.inventorysecond);
    $("#inventory-refproduct-update-name").val(inventory.inventoryproductname);
    $("#inventory-update-info").val(inventory.inventoryinfo);
    $("#inventory-refproduct-update-id").val(
      parseInt(inventory.inventoryproductid)
    );
    $("#inventory-refproduct-update-qty").val(parseInt(inventory.inventoryqty));
    // function update increse or decrease qty
    let inventoryUpdateQty = parseInt(
      $("input#inventory-refproduct-update-qty").val()
    );
    $("input#inventory-refproduct-update-qty").on("keyup", function () {
      inventoryUpdateQty = $(this).val();
    });
    $("#inventoryqty-update-decrease").on("click", function () {
      inventoryUpdateQty--;
      $("input#inventory-refproduct-update-qty").val(inventoryUpdateQty);
    });
    $("#inventoryqty-update-increase").on("click", function () {
      inventoryUpdateQty++;
      $("input#inventory-refproduct-update-qty").val(inventoryUpdateQty);
    });
    // action submit
    $("#inventory-update-submit")
      .off("click")
      .on("click", function () {
        const inventoryId = parseInt(inventory.inventoryid);
        const inventoryProductName = $(
          "#inventory-refproduct-update-name"
        ).val();
        const inventoryProductId = parseInt(
          $("#inventory-refproduct-update-id").val()
        );
        const inventoryProductQty = parseInt(
          $("input#inventory-refproduct-update-qty").val()
        );
        const inventoryInfo = $("#inventory-update-info").val();
        updateInventory(
          inventoryId,
          inventoryProductId,
          inventoryProductName,
          inventoryProductQty,
          inventoryInfo,
          (status, response) => {
            if (status) {
              console.log(response);
              console.log(inventoryId, inventoryProductId, inventoryProductQty);
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      });
  });
});
