// export pdf product
$("#product-export-pdf").on("click", () => {
    let file_path = dialog.showSaveDialogSync({
        title: "Export Data",
        filters: [{ name: "pdf", extensions: ["pdf"] }],
    });
    if (file_path) {
        file_path = file_path.replace(/\\/g, "/");
        db.all(`SELECT * FROM products ORDER BY id DESC`, (err, result) => {
            if (!err) {
                let thead = `< tr >
                        <th>Id</th>
                        <th>Nama Produk</th>
                        <th>Harga Produk</th>
                        <th>Keterangan</th>
                      </ > `;
                let tbody = "";
                result.forEach((row) => {
                    tbody += `< tr >
                      <td>${row.name}</td>
                      <td>${row.price}</td>
                      <td>${row.keterangan}</td>
                    </ > `;
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
    db.all(`SELECT * FROM products ORDER BY id DESC`, (err, result) => {
        if (!err) {
            let thead = `< tr >
                        <th>Id</th>
                        <th>Nama Produk</th>
                        <th>Harga Produk</th>
                        <th>Keterangan</th>
                      </ > `;
            let tbody = "";
            result.forEach((row) => {
                tbody += `< tr >
                      <td>${row.name}</td>
                      <td>${row.price}</td>
                      <td>${row.keterangan}</td>
                    </ > `;
            });
            ipcRenderer.send("print:product", thead, tbody);
        }
        if (err) {
            console.error(err);
        }
    });
});