export function listProductRefPersediaanCreate() {
  $(document).ready(function () {
    let $productSearch = $("input#persediaan-refproduct-search-name");
    const $productList = $("#persediaan-refproduct-create-list");
    $productList.hide();
    getInit($productSearch.val());
    let selectedIndex = -1; // Menyimpan indeks item yang dipilih
    $productSearch.on("focus", () => {
      $("#persediaan-refproduct-create-list").show();
    });
    $productSearch.on("blur", () => {
      setTimeout(() => {
        $("#persediaan-refproduct-create-list").hide();
      }, 200);
    });
    $productSearch.on("keyup", function () {
      getInit($productSearch.val());
      selectedIndex = -1; // Reset indeks saat melakukan pencarian baru
    });

    $productSearch.on("keydown", function (e) {
      const items = $(".persediaan-refproduct-create-val");
      if (items.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (selectedIndex < items.length - 1) {
            selectedIndex++;
          }
          highlightSelected(items);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (selectedIndex > 0) {
            selectedIndex--;
          }
          highlightSelected(items);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (selectedIndex >= 0) {
            items.eq(selectedIndex).click();
          }
        }
      }
    });

    function highlightSelected(items) {
      items.removeClass("selected");
      if (selectedIndex >= 0) {
        items.eq(selectedIndex).addClass("selected");
      }
    }

    // 1.Initial Product (getTotalRow, and getListProduct)
    function getInit(productSearch) {
      getTotalRowProduct(productSearch, (status, response) => {
        // success total row product
        if (status) {
          const totalProductList = parseInt(response);
          // exist product
          if (totalProductList >= 1) {
            $("#productList-empty").hide();
            getListProduct(productSearch, (status, response) => {
              if (status) {
                uiListRefPersediaanCreate(response);
                getValue();
              }
              if (!status) {
                console.error(response);
              }
            });
          }
          // nonexistence product
          if (totalProductList < 1) {
            // with search feature
            if (productSearch !== "") {
              const optionNotFound = `<div class='persediaan-refproduct-not-found'>product - <b>${productSearch}</b> tidak ditemukan</div>`;
              $("#persediaan-refproduct-create-list").html(optionNotFound);
            }
            // without search feature
            if (productSearch === "") {
              $productSearch.hide();
              $(".persediaan-refproduct-create-list").hide();
              $("#productList-empty").show();
            }
          }
        }
        // failed total row product
        if (!status) {
          console.error(response);
        }
      });
    }

    // 2.function to get value, get total qty based on click
    function getValue() {
      // Re-bind click event to new elements
      $(".persediaan-refproduct-create-val").on("click", function () {
        // function to get total qty
        getPersediaanQty($(this).attr("valueid"), (status, response) => {
          if (status) {
            const existProduct = response.length >= 1;
            if (existProduct) {
              const totalQty = response[0].TotalQty;
              $productSearch.val(
                `${this.textContent} - Totat Qty : ${totalQty}`
              );
            }
            if (!existProduct) {
              $productSearch.val(this.textContent);
            }
          }
          if (!status) {
            console.error(response);
          }
        });
        $("input#persediaan-refproduct-create-name").val(this.textContent);
        $("input#persediaan-refproduct-create-id").val($(this).attr("valueid"));
        $("input#persediaan-refproduct-create-rp").val(
          $(this).attr("valueprice")
        );
        $("#persediaan-refproduct-create-list").hide();
      });
    }
  });
}
