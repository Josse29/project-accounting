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
                <td class="text-center align-content-center">${el.id}</td>
                <td class="text-nowrap align-content-center">${el.name}</td>
                <td class="text-nowrap align-content-center">${el.category}</td>
                <td class="align-content-center">${el.price}</td>
                <td>
                  <div class="d-flex w-100 justify-content-center gap-2">
                    <button 
                    class="btn btn-success text-white"
                    data-bs-toggle="modal" data-bs-target="#productsModalDetail" 
                    id="detailProduct" 
                    data-productid="${el.id}"  
                    data-productname="${el.name}" 
                    data-productprice="${el.price}" data-productketerangan="${el.keterangan}" 
                    data-productcategory="${el.category}"
                    data-productimage="${el.image}">
                      <i 
                      class="fa-solid fa-eye"
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>lihat-${el.name}</span>" data-bs-placement="bottom"
                      ></i>
                    </button>
                    <button 
                    class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#editProductModal" 
                    id="editProduct" 
                    data-productid="${el.id}"  
                    data-productname="${el.name}" 
                    data-productprice="${el.price}" data-productketerangan="${el.keterangan}" 
                    data-productcategory="${el.category}"
                    data-productimage="${el.image}">
                      <i 
                      class="fa-solid fa-pencil" 
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>edit-${el.name}</span>" data-bs-placement="bottom"></i>
                    </button>
                    <button 
                    class="btn btn-danger text-white" 
                    id="deleteProduct" 
                    data-productid="${el.id}" 
                    data-productname="${el.name}" 
                    data-bs-toggle="modal" data-bs-target="#confirmDeleteProductModal">
                      <i 
                      class="fa-solid fa-trash-can" data-bs-toggle="tooltip" 
                      data-bs-html="true"
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
  const getProductsAgain = () => {
    getProducts(
      $("#product_limit").val(),
      1,
      "",
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
    const file = document.getElementById('create-image-product').files
    // with image
    if (file.length > 0) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageBase64 = reader.result
        insertProducts(
          $("#product-name").val(),
          $("#product-price").val(),
          $("#product-keterangan").val(),
          imageBase64,
          (status, response) => {
            if (status) {
              console.log("upload image + form")
              console.log(response);
              getProductsAgain();
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      }
      if (file[0]) {
        reader.readAsDataURL(file[0]);
      }
    }
    // without image
    if (file.length < 1) {
      insertProducts(
        $("#product-name").val(),
        $("#product-price").val(),
        $("#product-keterangan").val(),
        "",
        (status, response) => {
          if (status) {
            console.log(response);
            console.log("upload imageless + form")
            getProductsAgain();
          }
          if (!status) {
            console.error(response);
          }
        }
      );
    }
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
  // 4. Edit product mck kesell
  $(document).on("click", "#editProduct", function () {
    // get value from params 
    const product = this.dataset;
    // all-input-product
    $("#editProductModalLabel").html(product.productname)
    $("#edit-product-name").val(product.productname)
    $("#edit-product-price").val(product.productprice)
    $("#edit-product-keterangan").val(product.productketerangan)
    // it doesn't exist productimage from params
    if (product.productimage === "null") {
      $("img#edit-product-image").attr("src", "")
      $("#section-edit-product-img").addClass("d-none")
    }
    // it exist productimage from params
    if (product.productimage !== "null") {
      $("#section-edit-product-img").removeClass("d-none")
      $("img#edit-product-image").attr("src", product.productimage)
    }
    // preview-image-productedit keselll
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

    // action image kesell xxx
    $("#edit-product-submit").on("click", () => {
      // with image
      const file = document.getElementById('edit-product-image-file').files
      if (file.length > 0) {
        const reader = new FileReader()
        reader.onload = function () {
          const imgbase64 = reader.result
          db.run(`UPDATE products
                  SET name = '${$("#edit-product-name").val()}',
                      price = '${$("#edit-product-price").val()}',
                      keterangan = '${$("#edit-product-keterangan").val()}', 
                      image = '${imgbase64}'
                  WHERE id = '${product.productid}'`, (err) => {
            if (!err) {
              console.log("berhasil diupdated dengan gambar")
              getProductsAgain()
            }
            if (err) {
              console.log(err)
              console.log("gagal updated")
            }
          })
        }
        if (file[0]) {
          reader.readAsDataURL(file[0])
        }
      }
      if (file.length < 1) {
        db.run(`UPDATE products
                      SET name = '${$("#edit-product-name").val()}',
                          price = '${$("#edit-product-price").val()}',
                          keterangan = '${$("#edit-product-keterangan").val()}'
                      WHERE id = '${product.productid}'`, (err) => {
          if (!err) {
            console.log("berhasil diupdated tanpa gambar")
            getProductsAgain()
          }
          if (err) {
            console.log(err)
            console.log("gagal updated")
          }
        })
      }
    })
    // remove-image
    $("#edit-product-cancel-image").on("click", () => {
      db.run(`UPDATE products
              SET image = 'null'
              WHERE id = '${product.productid}'`, (err) => {
        if (!err) {
          console.log("berhasil-hapus gambar ")
          $("#edit-product-image-file").val("")
          $("#section-edit-product-img").addClass("d-none")
          getProductsAgain()
        }
        if (err) {
          console.log(err)
          console.log("gagal-hapus-gambar")
        }
      })
    })
  });
  // 5.detail-product
  $(document).on("click", "#detailProduct", function () {
    const product = this.dataset;
    console.log(product)
    $("#detailProductModalLabel").html(product.productname)
    $("#detail-product-name").text(product.productname)
    document.getElementById('detail-product-image').src = `${product.productimage}`
    if (product.productimage === "null") {
      $("#detail-product-image").addClass("d-none")
      $("#detail-no-image").text(`no - image displayed`)
    }
    $("#detail-product-price").text(product.productprice)
    $("#detail-category-price").text(product.productcategory)
    $("#detail-product-keterangan").text(product.productketerangan)
  });

  // preview-image-product
  $("#create-image-product").on("change", (event) => {
    const files = event.target.files
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = function () {
        const preview = document.getElementById('create-image-product-preview');
        preview.src = reader.result;
        preview.classList.add("mb-3")
        $("#section-image").removeClass("d-none")
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  })
  // cancel-product-create-image
  $("#cancel-image").on("click", () => {
    $("#create-image-product").val("")
    $("#section-image").addClass("d-none")
  })

  // export excel product
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
  // ui category
  const uiTrCategory = (el) => {
    return `<tr>
            <td class="text-center align-content-center">${el.id}</td>
            <td class="text-nowrap align-content-center">
              ${el.category}
            </td>
            <td class="text-nowrap align-content-center">
              ${el.keterangan}
            </td>
            <td>
              <div class="d-flex w-100 justify-content-center gap-2">
                <button class="btn btn-success text-white">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <button 
                  class="btn btn-primary text-white" 
                  data-bs-toggle="modal" 
                  data-bs-target="#categoryModalEdit"
                  id="editCategory"
                  data-categoryid="${el.id}"
                  data-categorynama="${el.category}" 
                  data-categoryketerangan="${el.keterangan}"   
                  >
                    <i 
                    class="fa-solid fa-pencil" 
                    data-bs-toggle="tooltip" 
                    data-bs-html="true"
                    data-bs-title="<span>edit-${el.category}</span>" data-bs-placement="bottom"></i>
                </button>
                <button 
                class="btn btn-danger text-white"
                data-bs-toggle="modal" 
                data-bs-target="#confirmDeleteCategoryModal"
                id="deleteCategory"
                data-categoryid="${el.id}"
                data-categorynama="${el.category}" 
                data-categoryketerangan="${el.keterangan}"
                >
                  <i 
                  class="fa-solid fa-trash-can"
                  data-bs-toggle="tooltip" 
                  data-bs-html="true"
                  data-bs-title="<span>hapus-${el.category}</span>" data-bs-placement="bottom"
                  ></i>
                </button>
              </div>
            </td>
          </tr> `
  }
  const uiListCategory = (el) => {
    return `<option value=${el.id}>${el.category}</option>`
  }
  db.all(`SELECT * FROM categories`, (err, res) => {
    if (!err) {
      let option = ``
      res.forEach((el) => {
        option += uiListCategory(el)
      })
      $("#create-categories-selection").html(option)
    }
    if (err) {
      console.log(res)
    }
  })
  // 1. create-category
  $("#category-submit").on("click", () => {
    db.run(`INSERT 
    INTO categories(category, keterangan) 
    VALUES('${$("#category-nama").val()}', '${$("#category-keterangan").val()}')`, (err) => {
      if (!err) {
        console.log("kategori berhasil ditambahkan")
      }
      if (err) {
        console.log("kategori gagal ditambahkan")
      }
    });
  })
  // 2. read-category
  db.all(`SELECT *
      FROM categories`, (err, res) => {
    if (!err) {
      let tr = ``
      res.forEach((el) => {
        tr += uiTrCategory(el)
      })
      $("#category-data").html(tr)
      reinitializeTooltips();
    }
    if (err) {
      return callback(false, err);
    }
  });
  // 3.update-category
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
  // 4.delete-category
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
})
