import { getUserAgain } from "./read.js";
import { deleteById } from "./services.js";
import { uiAlertSuccess } from "./ui.js";

$("tbody#user")
  .off("click", "button#user-delete")
  .on("click", "button#user-delete", function () {
    const user = this.dataset;
    const userId = parseInt(user.userid);
    const userFullname = user.userfullname;
    const p = `<p class="fs-4 text-center">Are You Sure to Delete <span class="fw-bold text-capitalize">${userFullname}</span> ?</p>`;
    $("#confirmation-text").html(p);
    // send-to-db
    $("#user-delete-modal button#send-to-db")
      .off("click")
      .on("click", async function () {
        const req = {
          userId,
          userFullname,
        };
        const deleted = await deleteById(req);
        const status = deleted.status;
        const response = deleted.response;
        if (status) {
          console.log(response);
          //   ui alert
          const alert = uiAlertSuccess(response);
          $("#section-user #crud-success").html(alert);
          console.log("test-1");
          getUserAgain();
          $("#user-delete-modal").modal("hide");
        }
        if (!status) {
          console.error(response);
        }
      });
  });
