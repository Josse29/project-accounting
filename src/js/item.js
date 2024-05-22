import {
  deleteProductId,
  getProducts,
  insertProducts,
  lastOffsetProducts,
} from "../query-execute/products.js";
import {
  sendIpcCloseWindowItem,
  sendIpcHideWindowItem,
  sendIpcLoadAbout,
  sendIpcLoadDashboard,
  sendIpcLoadData,
  sendIpcLoadOrder,
  sendIpcLoadUsers,
  sendIpcMinWinItems,
} from "./ipc.js";
import { timeIndonesian } from "./utils.js";
$(document).ready(function () {
  // all-pages
  $("#minWindow").on("click", () => {
    sendIpcMinWinItems();
  });
  $("#closeWindow").on("click", () => {
    sendIpcCloseWindowItem();
  });
  $("#dashboardWindow").on("click", () => {
    sendIpcHideWindowItem();
    sendIpcLoadDashboard();
  });
  $("#orderWindow").on("click", () => {
    sendIpcHideWindowItem();
    sendIpcLoadOrder();
  });
  $("#dataWindow").on("click", () => {
    sendIpcHideWindowItem();
    sendIpcLoadData();
  });
  $("#usersWindow").on("click", () => {
    sendIpcHideWindowItem();
    sendIpcLoadUsers();
  });
  $("#aboutWindow").on("click", () => {
    sendIpcHideWindowItem();
    sendIpcLoadAbout();
  });

  // update times
  const updateTimeIndonesian = () => {
    $(".hari-tanggal-tahun").text(timeIndonesian().indonesiaDayMonthYear);
  };
  updateTimeIndonesian();
  setInterval(() => {
    updateTimeIndonesian();
  }, 1000);

  // reinit tooltip 
  const reinitializeTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  };
  reinitializeTooltips();

  // UI tr Product from dbsqlite
  const uitrProduct = (el) => {
    return `<tr>
                <td class="text-center align-content-center">${el.id} test</td>
                <td class="text-nowrap align-content-center">${el.name}</td>
                <td class="text-nowrap align-content-center">${el.category}</td>
                <td class="align-content-center">${el.price}</td>
                <td>
                  <div class="d-flex w-100 justify-content-center gap-2">
                    <button class="btn btn-success text-white" data-bs-toggle="tooltip" data-bs-html="true"
                    data-bs-title="<span>print-product</span>" data-bs-placement="bottom">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#editProductModal" id="editProduct" data-productid="${el.id}"  data-productname="${el.name}" data-productprice="${el.price}" data-productketerangan="${el.keterangan}" data-productcategory="${el.category}">
                      <i class="fa-solid fa-pencil" data-bs-toggle="tooltip" data-bs-html="true"
                      data-bs-title="<span>edit-${el.name}</span>" data-bs-placement="bottom"></i>
                    </button>
                    <button class="btn btn-danger text-white" id="deleteProduct" data-productid="${el.id}" data-productname="${el.name}" data-bs-toggle="modal" data-bs-target="#confirmDeleteProductModal">
                      <i class="fa-solid fa-trash-can" data-bs-toggle="tooltip" data-bs-html="true"
                      data-bs-title="<span>hapus-${el.name}</span>" data-bs-placement="bottom"></i>
                    </button>
                  </div>
                </td>
              </tr>`;
  };

  // CRUD_PRODUCTS_OPERATION - PRODUCTS
  // 1.Get Products
  getProducts(
    $("#product_limit").val(),
    $("#product_offset").text().trim(),
    $("input#search-product").val(),
    (status, response) => {
      if (status) {
        let tr = ``;
        response.forEach((el) => {
          tr += uitrProduct(el);
        });
        $("#data-products").html(tr);
        reinitializeTooltips()
        lastOffsetProducts(
          $("#product_limit").val(),
          $("input#search-product").val(),
          (status, response) => {
            if (status) {
              $("#product_offset_last").text(response);
              console.log("last page : " + response);
            }
            if (!status) {
              console.log(response);
            }
          }
        );
      } else {
        console.error(response);
      }
    }
  );
  const getProductsAgain = (limit, offset) => {
    getProducts(
      limit,
      offset,
      $("input#search-product").val(),
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((el) => {
            tr += uitrProduct(el);
          });
          $("#data-products").html(tr);
          reinitializeTooltips();
        }
        if (!status) {
          console.err(response);
        }
      }
    );
  };
  // pagination (lastOffset, firstOffset, lastOffset, limit)
  $("#product_first_page").on("click", () => {
    getProducts(
      $("#product_limit").val(),
      1,
      $("input#search-product").val(),
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((el) => {
            tr += uitrProduct(el);
          });
          $("#data-products").html(tr);
          $("#product_offset").text(1);
          reinitializeTooltips();
        }
        if (!status) {
          console.err(response);
        }
      }
    );
  });
  $("#product_prev_page").on("click", () => {
    let limit = $("#product_limit").val();
    let offset = parseInt($("#product_offset").text().trim());
    let currentOffset = (offset -= 1);
    if (currentOffset >= 1) {
      getProducts(
        limit,
        currentOffset,
        $("input#search-product").val(),
        (status, response) => {
          if (status) {
            let tr = ``;
            response.forEach((el) => {
              tr += uitrProduct(el);
            });
            $("#data-products").html(tr);
            $("#product_offset").text(currentOffset);
            reinitializeTooltips();
          }
          if (!status) {
            console.err(response);
          }
        }
      );
    }
    if (currentOffset < 1) {
      getProducts(
        limit,
        $("#product_offset_last").text(),
        $("input#search-product").val(),
        (status, response) => {
          if (status) {
            let tr = ``;
            response.forEach((el) => {
              tr += uitrProduct(el);
            });
            $("#data-products").html(tr);
            $("#product_offset").text($("#product_offset_last").text());
          }
          if (!status) {
            console.err(response);
          }
        }
      );
    }
  });
  $("#product_next_page").on("click", () => {
    let limit = $("#product_limit").val();
    let lastOffset = $("#product_offset_last").text();
    let offset = parseInt($("#product_offset").text().trim());
    let currentOffset = (offset += 1);
    if (currentOffset <= lastOffset) {
      getProducts(
        limit,
        currentOffset,
        $("input#search-product").val(),
        (status, response) => {
          if (status) {
            let tr = ``;
            response.forEach((el) => {
              tr += uitrProduct(el);
            });
            $("#data-products").html(tr);
            $("#product_offset").text(currentOffset);
            reinitializeTooltips();
          }
          if (!status) {
            console.err(response);
          }
        }
      );
    }
    if (currentOffset > lastOffset) {
      getProducts(
        limit,
        1,
        $("input#search-product").val(),
        (status, response) => {
          if (status) {
            let tr = ``;
            response.forEach((el) => {
              tr += uitrProduct(el);
            });
            $("#data-products").html(tr);
            $("#product_offset").text(1);
            reinitializeTooltips();
          }
          if (!status) {
            console.err(response);
          }
        }
      );
    }
  });
  $("#product_last_page").on("click", () => {
    getProducts(
      $("#product_limit").val(),
      $("#product_offset_last").text(),
      $("input#search-product").val(),
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((el) => {
            tr += uitrProduct(el);
          });
          $("#data-products").html(tr);
          $("#product_offset").text($("#product_offset_last").text());
          reinitializeTooltips();
        }
        if (!status) {
          console.err(response);
        }
      }
    );
  });
  $("#product_limit").change(function () {
    getProducts(
      $(this).val(),
      1,
      $("input#search-product").val(),
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((el) => {
            tr += uitrProduct(el);
          });
          $("#data-products").html(tr);
          $("#product_offset").text(1);
          reinitializeTooltips();
          lastOffsetProducts(
            $("#product_limit").val(),
            $("input#search-product").val(),
            (status, response) => {
              if (status) {
                $("#product_offset_last").text(response);
                console.log("last page : " + response);
              }
              if (!status) {
                console.log(response);
              }
            }
          );
        }
        if (!status) {
          console.err(response);
        }
      }
    );
  });
  // search
  $("span#search-product").on("click", () => {
    getProducts(
      $("#product_limit").val(),
      $("#product_offset").text().trim(),
      $("input#search-product").val(),
      (status, response) => {
        if (status) {
          let tr = ``;
          response.forEach((el) => {
            tr += uitrProduct(el);
          });
          $("#data-products").html(tr);
          reinitializeTooltips();
          lastOffsetProducts(
            $("#product_limit").val(),
            $("input#search-product").val(),
            (status, response) => {
              if (status) {
                $("#product_offset_last").text(response);
                console.log("last page : " + response);
              }
              if (!status) {
                console.log(response);
              }
            }
          );
        }
        if (!status) {
          console.err(response);
        }
      }
    );
  });

  // 2. Create Product
  $("#submit_product").on("click", () => {
    insertProducts(
      productName,
      priceProduct,
      keteranganProduct,
      (status, response) => {
        if (status) {
          console.log(response);
          getProductsAgain();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  });

  // 3. Delete Product event binding mckkkk
  $(document).on("click", "#deleteProduct", function () {
    const product = this.dataset;
    const konfirmasiDelete = `Apakah anda yakin menghapus - <span class="fw-bold">${product.productname}</span> ?`;
    $("#confirmDeleteProductModalLabel").html(product.productname);
    $("#confirm-text").html(konfirmasiDelete);
    $("#sureDelete").on("click", () => {
      deleteProductId(product.productid, (status, response) => {
        if (status) {
          console.log(response);
          getProductsAgain();
        }
        if (!status) {
          console.error(response);
        }
      });
    });
  });

  // 4. Edit product
  $(document).on("click", "#editProduct", function () {
    const product = this.dataset;
    $("#editProductModalLabel").html(product.productname)
    $("#name-product").val(product.productname)
    $("#price-product").val(product.productprice)
    $("#keterangan-product").val(product.productketerangan)
    $("#submit-edit-product").on("click", () => {
      db.run(`UPDATE products
              SET name = '${$("#name-product").val()}' 
              WHERE id = '${product.productid}'`, (err) => {
        if (!err) {
          console.log("berhasil")
        }
        if (err) {
          console.log("gagal")
        }
      })
    })
  });

  // export excel
  $("#product-export-excel").on("click", () => {
    let file_path = dialog.showSaveDialogSync({
      filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
    });
    file_path = file_path.replace(/\\/g, "/");
    db.all(`SELECT * FROM products ORDER BY id DESC`, (err, result) => {
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
            alert("data berhasil disimpan");
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
  // export pdf
  $("#product-export-pdf").on("click", () => {
    let file_path = dialog.showSaveDialogSync({
      title: "Export Data",
      filters: [{ name: "pdf", extensions: ["pdf"] }],
    });
    if (file_path) {
      file_path = file_path.replace(/\\/g, "/");
      db.all(`SELECT * FROM products ORDER BY id DESC`, (err, result) => {
        if (!err) {
          let thead = `<tr>
                        <th>Id</th>
                        <th>Nama Produk</th>
                        <th>Harga Produk</th>
                        <th>Keterangan</th>
                      </tr>`;
          let tbody = "";
          result.forEach((row) => {
            tbody += `<tr>
                      <td>${row.name}</td>
                      <td>${row.price}</td>
                      <td>${row.keterangan}</td>
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
  // export pdf
  $("#product-export-print").on("click", () => {
    db.all(`SELECT * FROM products ORDER BY id DESC`, (err, result) => {
      if (!err) {
        let thead = `<tr>
                        <th>Id</th>
                        <th>Nama Produk</th>
                        <th>Harga Produk</th>
                        <th>Keterangan</th>
                      </tr>`;
        let tbody = "";
        result.forEach((row) => {
          tbody += `<tr>
                      <td>${row.name}</td>
                      <td>${row.price}</td>
                      <td>${row.keterangan}</td>
                    </tr>`;
        });
        ipcRenderer.send("print:product", thead, tbody);
      }
      if (err) {
        console.error(err);
      }
    });
  });
})  
