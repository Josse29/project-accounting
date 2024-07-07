import {
  getListProduct,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";

// function to update when create list product ref persediaan
export function listProductRefPersediaanCreate() {
  $("#persediaan-refproduct-create-list").hide();
  function updateProductList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='persediaan-refproduct-create-val fs-6' valueid=${el.ProductId} valueprice=${el.ProductPrice}>${el.ProductName}</div>`;
    });
    $("#persediaan-refproduct-create-list").html(option);
    // Re-bind click event to new elements
    $(".persediaan-refproduct-create-val").on("click", function () {
      $("input#persediaan-refproduct-create-id").val($(this).attr("valueid"));
      $("input#persediaan-refproduct-create-rp").val(
        $(this).attr("valueprice")
      );
      $("input#persediaan-refproduct-create-name").val(this.textContent);
      $("#persediaan-refproduct-create-list").hide();
    });
  }
  // Initial product fetch
  getTotalRowProduct("", (status, response) => {
    if (status) {
      const totalProductList = response;
      if (totalProductList >= 1) {
        $(".persediaan-refproduct-create-list").show();
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
        $(".persediaan-refproduct-create-list").hide();
        $("#productList-empty").show();
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  $("input#persediaan-refproduct-create-name").on("focus", () => {
    $("#persediaan-refproduct-create-list").show();
  });
  $("input#persediaan-refproduct-create-name").on("blur", () => {
    setTimeout(() => {
      $("#persediaan-refproduct-create-list").hide();
    }, 200);
  });
  $("input#persediaan-refproduct-create-name").on("keyup", function () {
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
          const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
          $("#persediaan-refproduct-create-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  });
}
// function to update when update list product ref persediaan
export function listProductRefpersediaanUpdate() {
  $("#persediaan-refproduct-update-list").hide();
  function updateProductList(response) {
    let option = "";
    response.forEach((el) => {
      option += `<div class='persediaan-refproduct-update-val fs-6' value='${el.ProductId}'>${el.ProductName}</div>`;
    });
    $("#persediaan-refproduct-update-list").html(option);
    // Re-bind click event to new elements
    $(".persediaan-refproduct-update-val").on("click", function () {
      $("input#persediaan-refproduct-update-id").val($(this).attr("value"));
      $("input#persediaan-refproduct-update-name").val(this.textContent);
      $("#persediaan-refproduct-update-list").hide();
    });
  }
  // Initial product fetch
  getTotalRowProduct("", (status, response) => {
    if (status) {
      const totalProductList = response;
      if (totalProductList >= 1) {
        $(".persediaan-refproduct-update-list").show();
        $("#persediaan-update-productList-empty").hide();
        getListProduct("", (status, response) => {
          if (status) {
            updateProductList(response);
          } else {
            console.error(response);
          }
        });
      }
      if (totalProductList < 1) {
        $(".persediaan-refproduct-update-list").hide();
        $("#persediaan-update-productList-empty").show();
      }
    }
    if (!status) {
      console.log(response);
    }
  });
  $("input#persediaan-refproduct-update-name").on("focus", () => {
    $("#persediaan-refproduct-update-list").show();
  });
  $("input#persediaan-refproduct-update-name").on("blur", () => {
    setTimeout(() => {
      $("#persediaan-refproduct-update-list").hide();
    }, 200);
  });
  $("input#persediaan-refproduct-update-name").on("keyup", function () {
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
          const optionNotFound = `<div class='persediaan-refproduct-update-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
          $("#persediaan-refproduct-update-list").html(optionNotFound);
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  });
}
