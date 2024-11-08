import { deleteAll } from "./services.js";
import { uiSuccess } from "./ui.js";
import { getAll } from "./utils.js";

$("button#sale-delete-all")
  .off("click")
  .on("click", async function () {
    const { status, response } = await deleteAll();
    if (status) {
      await getAll();
      uiSuccess(response);
      $("#modal-sales-delete-all").modal("hide");
    }
    if (!status) {
      console.error(response);
    }
  });
