const btnConvertPDF = $(
  "div#receivable-convert-pdf .modal-footer button.btn-primary"
);
$(btnConvertPDF)
  .off("click")
  .on("click", () => {
    const startDateVal = $("input#receivable-pdf-start-date").val();
    const endDateVal = $("input#receivable-pdf-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    console.log(req);
  });
