// get detail based on paramsid
$("tbody#supplier-table")
  .off("click", "#supplierDetail")
  .on("click", "#supplierDetail", function () {
    const supplier = $(this).closest("tr")[0].dataset;
    const supplierName = supplier.suppliername;
    const supplierInfo = supplier.supplierinfo;
    const supplierImg = supplier.supplierimg;
    const supplierDate = supplier.supplierdate;
    const supplierProducList = supplier.supplierproductlist;
    // supplierdate
    $("p#supplier-date-detail").text(supplierDate);
    // supplier name
    $("#supplierDetailModalLabel").text(supplierName);
    $("#supplier-detail-name").text(supplierName);
    // if exist photo
    if (supplierImg === "null") {
      $("#no-image").removeClass("d-none");
      $("#supplier-detail-img").attr("src", "");
    }
    // if it doesn't exist photo
    if (supplierImg !== "null") {
      $("#no-image").addClass("d-none");
      $("#supplier-detail-img").attr("src", supplierImg);
    }
    // information
    const information = supplierInfo ? supplierInfo : "-";
    $("#supplier-detail-info").text(information);
    // list product
    let productList = ``;
    if (supplierProducList !== "null") {
      productList = `<ul>`;
      supplierProducList
        .split(",")
        .map(
          (product) =>
            (productList += `<li class="fs-5">${product.trim()}</li>`)
        );
      productList += `</ul>`;
    }
    if (supplierProducList === "null") {
      productList = `<p class='fs-5 ms-2 text-muted fst-italic'>product-no available</p>`;
    }
    $("div#supplier-detail-productid").html(productList);
  });
