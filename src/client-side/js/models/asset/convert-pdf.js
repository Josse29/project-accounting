const btnConvertPDF = $(
  "div#asset-convert-pdf .modal-footer button.btn-primary"
);
$(btnConvertPDF)
  .off("click")
  .on("click", () => {
    const startDateVal = $("input#asset-pdf-start-date").val();
    const endDateVal = $("input#asset-pdf-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    console.log(req);
  });
