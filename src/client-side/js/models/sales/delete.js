import { getSalesAgain } from "./read.js";
import { deleteAll } from "./services.js";
import { uiSuccess } from "./ui.js";

$("button#sale-delete-all")
  .off("click")
  .on("click", async function () {
    const { status, response } = await deleteAll();
    if (status) {
      uiSuccess(response);
      await getSalesAgain();
      $("#modal-sales-delete-all").modal("hide");
    }
    if (!status) {
      console.error(response);
    }
  });
