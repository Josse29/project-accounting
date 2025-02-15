$("div#asset-table tbody")
  .off("click", "button.btn-success")
  .on("click", "button.btn-success", function () {
    const asset = $(this).closest("tr")[0].dataset;
    const assetName = asset.assetname;
    const assetPrice = asset.assetprice;
    const assetImg = asset.assetimg;
    const assetInfo = asset.assetinfo;
    const userEmail = asset.useremail;
    const userFullname = asset.userfullname;
    // head title
    const ui1 = `
    <h3 class="modal-title text-white text-capitalize">${assetName}</h3>
    `;
    $("div#asset-detail-modal .modal-content .modal-header").html(ui1);
    const ui = `
    <!-- asset name -->
    <div class="mb-3">
      <p class="fs-4 mb-1">Asset Name</p>
      <p class="fs-4 ms-2 mb-0 text-capitalize">${assetName}</p>
    </div>
    <!-- asset price -->
    <div class="mb-3">
      <p class="fs-4 mb-1">Asset Balance</p>
      <p class="fs-4 ms-2 mb-0">${assetPrice}</p>
    </div>
    <!-- asset img  -->
    <div class="mb-3">
      <p class="fs-4 mb-1">Asset Image</p>
      ${
        assetImg !== "null"
          ? `
          <img src="${assetImg}" alt="asset-img" class="w-100 my-2" />
          `
          : `        
          <p class="fs-5 ms-2 mb-0 text-muted fst-italic">No displayed....</p>
          `
      }
    </div>
    <!-- Asset Person  -->
    <div class="mb-3">
      <p class="fs-4 mb-1">Asset Person</p>
      ${
        userEmail !== "null"
          ? `
      <p class="fs-5 ms-2 mb-0">Fullname : ${userFullname}</p>
      <p class="fs-5 ms-2 mb-0">Email : ${userEmail}</p>
      `
          : `
      <p class="fs-5 ms-2 mb-0">-</p>
      `
      }
    </div>
    <!-- asset info  -->
    <div class="mb-3">
      <p class="fs-4 mb-1">Information</p>
      ${
        assetInfo !== ""
          ? `<p class="fs-5 ms-2 mb-0">${assetInfo}</p>`
          : `<p class="fs-5 ms-2 mb-0">-</p>`
      }
    </div>
    `;
    $("div#asset-detail-modal div.modal-body").html(ui);
  });
