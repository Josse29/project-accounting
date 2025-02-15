const btnConvertCSV = $(
  "div#asset-convert-csv .modal-footer button.btn-success"
);

$(btnConvertCSV)
  .off("click")
  .on("click", () => {
    const startDateVal = $("input#asset-csv-start-date").val();
    const endDateVal = $("input#asset-csv-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    console.log(req);
  });
