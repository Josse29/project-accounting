import { getSales1 } from "./read.js";
import { deleteAll } from "./services.js";
import { uiSuccess } from "./ui.js";

$("button#sale-delete-all")
  .off("click")
  .on("click", async function () {
    const { status, response } = await deleteAll();
    if (status) {
      await getSales1();
      uiSuccess(response);
      $("#modal-sales-delete-all").modal("hide");
    }
    if (!status) {
      console.error(response);
    }
  });
