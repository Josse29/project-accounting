import { getCategoryAgain } from "./read.js";

$("#category-submit").on("click", () => {
    db.run(`INSERT 
            INTO categories(category, keterangan) 
            VALUES('${$("#category-nama").val()}', '${$("#category-keterangan").val()}')`, (err) => {
        if (!err) {
            console.log("kategori berhasil ditambahkan")
            getCategoryAgain()
        }
        if (err) {
            console.log("kategori gagal ditambahkan")
        }
    });
})