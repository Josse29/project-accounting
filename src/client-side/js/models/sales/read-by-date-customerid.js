// by date and user
listUserRefSalesReadDate();
$(document)
  .off("change", "select#sales-read-personid-date")
  .on("change", "select#sales-read-personid-date", function () {
    $("select#sales-read-productid-date").val("Choose One Of Products");
    $("select#sales-read-customerid-date").val("Choose One Of Customers");
    const selectedPersonId = parseInt($(this).val());
    const selectedText = $(this).find("option:selected").text();
    const req = {
      startDateVal,
      endDateVal,
      selectedPersonId,
    };
    getSalesSumPersonIdDate(req, (status, response) => {
      if (status) {
        const rupiah = formatRupiah2(response);
        const ui = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                      <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
        $("div#summary").html(ui);
      }
      if (!status) {
        console.error(response);
      }
    });
    getSalesPersonIdDate(req, (status, response) => {
      if (status) {
        const existed = response.length >= 1;
        if (existed) {
          let table = ``;
          let index = 1;
          response.forEach((rows) => {
            table += uiTable(rows, index);
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
$(document)
  .off("change", "select#sales-read-customerid-date")
  .on("change", "select#sales-read-customerid-date", function () {
    $("select#sales-read-productid-date").val("Choose One Of Products");
    $("select#sales-read-personid-date").val("Choose One Of Sales");
    const selectedPersonId = parseInt($(this).val());
    const selectedText = $(this).find("option:selected").text();
    const req = {
      startDateVal,
      endDateVal,
      selectedPersonId,
    };
    getSalesSumCustomerIdDate(req, (status, response) => {
      if (status) {
        const rupiah = formatRupiah2(response);
        const ui = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                      <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
        $("div#summary").html(ui);
      }
      if (!status) {
        console.error(response);
      }
    });
    getSalesCustomerIdDate(req, (status, response) => {
      if (status) {
        const existed = response.length >= 1;
        if (existed) {
          let table = ``;
          let index = 1;
          response.forEach((rows) => {
            table += uiTable(rows, index);
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
