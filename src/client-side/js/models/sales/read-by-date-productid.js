// by date and product
listProductRefSalesReadDate();
$(document)
  .off("change", "select#sales-read-productid-date")
  .on("change", "select#sales-read-productid-date", function () {
    $("select#sales-read-personid-date").val("Choose One Of Sales");
    $("select#sales-read-customerid-date").val("Choose One Of Customers");
    const selectedProductId = parseInt($(this).val());
    const selectedText = $(this).find("option:selected").text();
    const req = {
      startDateVal,
      endDateVal,
      selectedProductId,
    };
    getSalesSumDateProductId(req, (status, response) => {
      if (status) {
        const rupiah = formatRupiah2(response.rupiah);
        const qty = response.qty;
        const ui = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                        <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                        <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
        $("div#summary").html(ui);
      }
      if (!status) {
        console.error(response);
      }
    });
    getSalesDateProductId(req, (status, response) => {
      if (status) {
        const existed = response.length >= 1;
        if (existed) {
          let table = ``;
          let index = 1;
          response.forEach((rows) => {
            table += uiTr(rows);
            index++;
          });
          $("div#sales-read-table").html(table);
        }
        if (!existed) {
          $("div#sales-read-table").html(
            uiTableEmpty(`${selectedText} , ${date}`)
          );
        }
        $("div#sales-page-container").addClass("d-none");
      }
      if (!status) {
        console.error(response);
      }
    });
  });
