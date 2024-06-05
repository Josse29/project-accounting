import { successActionProduct } from "./ui.js";

$(document).ready(function () {
    // export excel product
    $("#product-export-excel").on("click", () => {
        let file_path = dialog.showSaveDialogSync({
            filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
        });
        file_path = file_path.replace(/\\/g, "/");
        db.all(`SELECT 
                ProductName, CategoryName, ProductPrice, ProductInfo 
                FROM Product
                LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId  
                ORDER BY Product.ProductId DESC`, (err, result) => {
            if (!err) {
                let tHeadProduct = [Object.keys(result[0])];
                let tBodyProduct = result;
                let tableProduct = tHeadProduct.concat(tBodyProduct);
                let csvString = tableProduct
                    .map((item) => {
                        return Object.values(item).toString();
                    })
                    .join("\r\n");
                fs.writeFile(file_path, csvString, (err) => {
                    if (!err) {
                        successActionProduct(`File Excel tersimpan di ${file_path}`)
                    }
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                });
            }
            if (err) {
                console.error(err);
            }
        });
    });
})