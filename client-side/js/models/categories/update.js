$(document).on("click", "#editCategory", function () {
    const category = this.dataset;
    $("#categoryModalLabelEdit").html(category.categorynama)
    $("#edit-category-nama").val(category.categorynama)
    $("#edit-category-keterangan").val(category.categoryketerangan)
    $("#edit-category-submit").on("click", () => {
        db.run(`UPDATE categories
                SET category = '${$("#edit-category-nama").val()}',
                    keterangan = '${$("#edit-category-keterangan").val()}'
                WHERE id = '${category.categoryid}'`, (err) => {
            if (!err) {
                console.log("category berhasil diperbaharui")
            }
            if (err) {
                console.log("gagal")
            }
        })
    })
});