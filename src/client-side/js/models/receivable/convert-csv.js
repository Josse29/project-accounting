const btnConvertCSV = $(
  "div#receivable-convert-csv .modal-footer button.btn-success"
);

$(btnConvertCSV)
  .off("click")
  .on("click", () => {
    const startDateVal = $("input#receivable-csv-start-date").val();
    const endDateVal = $("input#receivable-csv-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    console.log(req);
  });
