import {
  getListProduct,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";

// function to update when create list product ref categories
export function listProductRefInventoryCreate() {
  $("#inventory-refproduct-create-list").hide();
  function updateProductList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='inventory-refproduct-create-val fs-6' value='${el.ProductId}'>${el.ProductName}</div>`;
    });
    $("#inventory-refproduct-create-list").html(option);
    // Re-bind click event to new elements
    $(".inventory-refproduct-create-val").on("click", function () {
      $("input#inventory-refproduct-create-id").val($(this).attr("value"));
      $("input#inventory-refproduct-create-name").val(this.textContent);
      $("#inventory-refproduct-create-list").hide();
    });
  }
  // Initial product fetch
  getTotalRowProduct("", (status, response) => {
    if (status) {
      const totalProductList = response;
      if (totalProductList >= 1) {
        $(".inventory-refproduct-create-list").show();
        $("#productList-empty").hide();
        getListProduct("", (status, response) => {
          if (status) {
            updateProductList(response);
          } else {
            console.error(response);
          }
        });
      }
      if (totalProductList < 1) {
        $(".inventory-refproduct-create-list").hide();
        $("#productList-empty").show();
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  $("input#inventory-refproduct-create-name").on("focus", () => {
    $("#inventory-refproduct-create-list").show();
  });
  $("input#inventory-refproduct-create-name").on("blur", () => {
    setTimeout(() => {
      $("#inventory-refproduct-create-list").hide();
    }, 200);
  });
  $("input#inventory-refproduct-create-name").on("keyup", function () {
    const productSearch = $(this).val();
    getTotalRowProduct(productSearch, (status, response) => {
      if (status) {
        const totalProductListSearch = response;
        if (totalProductListSearch >= 1) {
          getListProduct(productSearch, (status, response) => {
            if (status) {
              updateProductList(response);
            } else {
              console.error(response);
            }
          });
        }
        if (totalProductListSearch < 1) {
          console.log(totalProductListSearch);
          const optionNotFound = `<div class='inventory-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
          $("#inventory-refproduct-create-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  });
}
