// supplierCreateImg
$("#supplier-create-img").on("change", (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      const imgbase64 = reader.result;
      $("#supplier-create-img-section").removeClass("d-none");
      $("#supplier-create-img-preview").attr("src", imgbase64);
      $("#supplier-create-img-preview").addClass("mb-3");
    };
    reader.readAsDataURL(event.target.files[0]);
    // canceling image
    $("#supplier-create-img-cancel").on("click", () => {
      $("#supplier-create-img").val("");
      $("#supplier-create-img-section").addClass("d-none");
    });
  }
});
// supplierUpdateImgs keselll
$("#supplier-update-img").on("change", (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    $("#supplier-update-img-section").show();
    const reader = new FileReader();
    reader.onload = function () {
      const imgbase64 = reader.result;
      $("#supplier-update-img-preview").attr("src", imgbase64);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
});
