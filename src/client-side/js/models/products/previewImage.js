// preview-image-product on create
$("#create-image-product").on("change", (event) => {
    const files = event.target.files
    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
            $("#create-image-product-preview").attr("src", reader.result)
            $("#create-image-product-preview").addClass("mb-3")
            $("#section-image").removeClass("d-none")
        }
        reader.readAsDataURL(event.target.files[0]);
        // cancel-product-create-image
        $("#cancel-image").on("click", () => {
            $("#create-image-product").val("")
            $("#section-image").addClass("d-none")
        })
    }
})

// preview-image-product on edit keselll
$("#edit-product-image-file").on("change", (event) => {
    const files = event.target.files
    if (files.length > 0) {
        $("#section-edit-product-img").removeClass("d-none")
        const reader = new FileReader();
        reader.onload = function () {
            const preview = document.getElementById('edit-product-image');
            const imgbase64 = reader.result
            preview.src = imgbase64;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
})