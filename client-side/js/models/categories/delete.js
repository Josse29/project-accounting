$(document).on("click", "#deleteCategory", function () {
    const category = this.dataset;
    $("#confirmDeleteCategoryModalLabel").html(category.categorynama)
    const konfirmasiDelete = `Apakah anda yakin menghapus - <span class="fw-bold">${category.categorynama}</span> ? `;
    $("#confirmDeleteProductModalLabel").html(category.categorynama);
    $("#confirm-text-delete-category").html(konfirmasiDelete);
    $("#sure-delete-category").on("click", () => {
        db.run(`DELETE 
      FROM categories
      WHERE id = ${category.categoryid}`, (err) => {
            if (!err) {
                console.log("berhasil dihapus")
            }
            if (err) {
                console.log("gagal dihapus");
            }
        });
    });
});