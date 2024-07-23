import { successActionProduct } from "./ui.js";

$(document).ready(function () {
  // export excel product
  $("#product-export-excel").on("click", () => {
    const file_path = dialog.showSaveDialogSync({
      title: "Export Data",
      filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
    });
    if (file_path) {
      db.all(
        `SELECT 
                  Product.ProductName, Category.CategoryName, Product.ProductPrice, Product.ProductInfo 
                  FROM Product
                  LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId  
                  ORDER BY Product.ProductId DESC`,
        (err, result) => {
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
                successActionProduct(`File Excel tersimpan di ${file_path}`);
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
        }
      );
    }
  });
});
