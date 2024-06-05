// export pdf product
$("#product-export-pdf").on("click", () => {

    let file_path = dialog.showSaveDialogSync({
        title: "Export Data",
        filters: [{ name: "pdf", extensions: ["pdf"] }],
    });
    if (file_path) {
        file_path = file_path.replace(/\\/g, "/");
        db.all(`SELECT 
                ProductId, ProductName, CategoryName, ProductPrice, ProductInfo, ProductImage 
                FROM Product
                LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId  
                ORDER BY Product.ProductId DESC`, (err, result) => {
            if (!err) {
                let thead = `<tr>
                                <th>Id</th>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Harga Produk</th>
                                <th>Keterangan</th>
                                <th>Gambar</th>
                            </tr> `;
                let tbody = "";
                result.forEach((row) => {
                    tbody += `<tr>
                                <td class="text-center text-nowrap align-content-center">${row.ProductId}</td>
                                <td class="text-nowrap align-content-center">${row.ProductName}</td>
                                <td class="text-nowrap align-content-center">${row.CategoryName}</td>
                                <td class="text-nowrap align-content-center">${row.ProductPrice}</td>
                                <td class="text-nowrap align-content-center">${row.ProductInfo}</td>
                                <td style="width:200px">
                                    <img src="${row.ProductImage}" style="width:100%"/>
                                </td>
                            </tr>`;
                });
                ipcRenderer.send("pdf:product", thead, tbody, file_path);
            }
            if (err) {
                console.error(err);
            }
        });
    }
});
// export pdf product
$("#product-export-print").on("click", () => {
    db.all(`SELECT 
            ProductId, ProductName, CategoryName, ProductPrice, ProductInfo, ProductImage 
            FROM Product
            LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId  
            ORDER BY Product.ProductId DESC`, (err, result) => {
        if (!err) {
            let thead = `<tr>
                            <th>Id</th>
                            <th>Nama Produk</th>
                            <th>Kategori</th>
                            <th>Harga Produk</th>
                            <th>Keterangan</th>
                            <th>Gambar</th>
                        </tr> `;
            let tbody = "";
            result.forEach((row) => {
                tbody += `<tr>
                            <td class="text-center text-nowrap align-content-center">${row.ProductId}</td>
                            <td class="text-nowrap align-content-center">${row.ProductName}</td>
                            <td class="text-nowrap align-content-center">${row.CategoryName}</td>
                            <td class="text-nowrap align-content-center">${row.ProductPrice}</td>
                            <td class="text-nowrap align-content-center">${row.ProductInfo}</td>
                            <td style="width:200px">
                                <img src="${row.ProductImage}" style="width:100%"/>
                            </td>
                        </tr>`;
            });
            ipcRenderer.send("print:product", thead, tbody);
        }
        if (err) {
            console.error(err);
        }
    });
});