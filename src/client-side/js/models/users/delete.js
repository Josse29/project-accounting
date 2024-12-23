import { deleteById } from "./services.js";
import { uiAlertSuccess } from "./ui.js";
import { executeRead } from "./utils.js";

$("tbody#user")
  .off("click", "button#user-delete")
  .on("click", "button#user-delete", function () {
    const user = $(this).closest("tr")[0].dataset;
    const userId = parseInt(user.userid);
    const userFullname = user.userfullname;
    // label
    $("#user-delete-modal h1.modal-title").text(userFullname);
    // confirmation
    const p = `<p class="fs-4 text-center">Are You Sure to Delete <span class="fw-bold text-capitalize">${userFullname}</span> ?</p>`;
    $("#user-delete-modal #confirmation-text").html(p);
    // send-to-db
    $("#user-delete-modal button#send-to-db")
      .off("click")
      .on("click", async function () {
        const req = {
          userId,
          userFullname,
        };
        const { status, response } = await deleteById(req);
        if (status) {
          await executeRead();
          uiAlertSuccess(response);
          $("#user-delete-modal").modal("hide");
        }
        if (!status) {
          console.error(response);
        }
      });
  });
