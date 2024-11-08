$("button#cash-read-reset")
  .off("click")
  .on("click", () => {
    $("div#cash-summary").html(``);
    $("div#cash-card #limit-search").removeClass("d-none");
    $("div#cash-pagination-container").removeClass("d-none");
  });
