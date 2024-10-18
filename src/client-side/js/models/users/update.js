import { getImageBase64, validateImg } from "../../utils/loadImg.js";
import { getUserAgain } from "./read.js";
import { update } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("tbody#user")
  .off("click", "button#user-update")
  .on("click", "button#user-update", function () {
    // ui-init
    $("#user-update-modal #failed").html("");
    $("input#userimg1").val("");
    // 1.get value from attr
    const user = $(this).closest("tr")[0].dataset;
    const userEmail = user.useremail;
    const userFullname = user.userfullname;
    const userImg = user.userimg;
    const userPosition = user.userposition;
    const userId = parseInt(user.userid);
    // 2. label modal tet
    $("#user-update-modal  h1.modal-title").text(userFullname);
    // 3. find dom & fill input based userid
    // email
    $("#user-update-modal input#useremail1").val(userEmail);
    // fullname
    $("#user-update-modal input#userfullname1").val(userFullname);
    // position
    const position = ["admin", "sales", "customer"];
    let option = ``;
    position.forEach((el) => {
      let selected = userPosition === el && "selected";
      option += `<option value="${el}" ${selected} class="text-capitalize">${el}</option>`;
    });
    $("#user-update-modal select#userposition1").html(option);
    // preview-image
    const inputImg = $("#user-update-modal input#userimg1");
    const sectionImg = $("#user-update-modal #section-img1");
    const previewImg = $("#user-update-modal img#preview-img1");
    if (userImg !== "null") {
      $("#user-update-modal #section-img1").removeClass("d-none");
      $("#user-update-modal img#preview-img1").attr("src", userImg);
    }
    if (userImg === "null") {
      $("#user-update-modal #section-img1").addClass("d-none");
      $("#user-update-modal img#preview-img1").attr("src", "");
    }
    // load image
    let cancelImg = false;
    $("#user-update-modal input#userimg1")
      .off("change")
      .on("change", async function (e) {
        try {
          const target = e.target.files;
          const validate = validateImg(target);
          if (validate) {
            const imgBase64 = await getImageBase64(target[0]);
            previewImg.attr("src", imgBase64);
            sectionImg.removeClass("d-none");
          }
          if (!validate) {
            sectionImg.addClass("d-none");
          }
          cancelImg = false;
        } catch (error) {
          console.error(error);
        }
      });
    // cancel img
    $("i#cancel-image1")
      .off("click")
      .on("click", function () {
        cancelImg = true;
        inputImg.val("");
        sectionImg.addClass("d-none");
      });
    // send-to-db
    $("#user-update-modal button#send-to-db")
      .off("click")
      .on("click", async function () {
        const userEmail = $("input#useremail1").val();
        const userFullname = $("input#userfullname1").val();
        const userImg1 = $("input#userimg1")[0].files;
        const userPosition = $("select#userposition1").val();
        const req = {
          userEmail,
          userFullname,
          userPosition,
          userId,
          userImg1,
          cancelImg,
        };
        const updated = await update(req);
        const status = updated.status;
        const response = updated.response;
        if (status) {
          await getUserAgain();
          const uiSuccess = uiAlertSuccess(response);
          $("#crud-success").html(uiSuccess);
          $("#user-update-modal").modal("hide");
        }
        if (!status) {
          const uiFail = uiAlertFail(response);
          $("#user-update-modal #failed").html(uiFail);
          const modalBody = $("#user-update-modal .modal-body").get(0);
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          console.error(response);
        }
      });
  });
