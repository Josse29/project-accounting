$("tbody#category-data")
  .off("click", "#categoryDetailBtn")
  .on("click", "#categoryDetailBtn", function () {
    const category = $(this).closest("tr")[0].dataset;
    const categoryName = category.categorynama;
    const categoryInfo = category.categoryketerangan;
    const categoryProductList = category.categoryproductlist;
    $("#category-detail-label").text(categoryName);
    $("#category-detail-name").text(categoryName);
    if (categoryInfo !== "") {
      $("#category-detail-info").text(categoryInfo);
    }
    if (categoryInfo === "") {
      $("#category-detail-info").text("-");
    }
    // list product
    let productList = ``;
    if (categoryProductList !== "null") {
      const products = categoryProductList
        .split(",")
        .map((product) => product.trim());
      productList = `<ul>`;
      products.forEach((product) => {
        productList += `<li class='fs-5'>${product}</li>`;
      });
      productList += `</ul>`;
    }
    if (categoryProductList === "null") {
      productList = `<p class="fs-5 text-muted fst-italic">product no available</p>`;
    }
    $("div#category-detail-productlistid").html(productList);
  });
