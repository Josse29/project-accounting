import { previewLoadImg } from "../../utils/loadImg.js";
import { addUser } from "./services.js";
import { uiAlertFail } from "./ui.js";
// password
$("#user-create label.show-password")
  .off("click")
  .on("click", function () {
    $(".show-password").addClass("d-none");
    $(".hide-password").removeClass("d-none");
    $("#user-create input#userpassword").attr("type", "text");
  });
$("#user-create label.hide-password")
  .off("click")
  .on("click", function () {
    $(".show-password").removeClass("d-none");
    $(".hide-password").addClass("d-none");
    $("#user-create input#userpassword").attr("type", "password");
  });
// confirmation password
$("#user-create label.show-password1")
  .off("click")
  .on("click", function () {
    $(".show-password1").addClass("d-none");
    $(".hide-password1").removeClass("d-none");
    $("#user-create input#userpassword1").attr("type", "text");
  });
$("#user-create label.hide-password1")
  .off("click")
  .on("click", function () {
    $(".show-password1").removeClass("d-none");
    $(".hide-password1").addClass("d-none");
    $("#user-create input#userpassword1").attr("type", "password");
  });
// preview-image
const args = {
  inputImg: $("#user-create input#userimg"),
  sectionImg: $("#user-create #section-img"),
  previewImg: $("#user-create #preview-img"),
};
previewLoadImg(args);
// send-to-db
$("#user-create button#send-to-db")
  .off("click")
  .on("click", () => {
    const userEmailVal = $("#user-create #useremail").val();
    const userFullnameVal = $("#user-create #userfullname").val();
    const userPositionVal = $("#user-create #userposition").val();
    const userPasswordVal = $("#user-create #userpassword").val();
    const userPassword1Val = $("#user-create #userpassword1").val();
    const userImgVal = $("#user-create input#userimg").get(0).files;
    const req = {
      UserEmailVal: userEmailVal,
      UserFullnameVal: userFullnameVal,
      UserPasswordVal: userPasswordVal,
      UserPassword1Val: userPassword1Val,
      UserPositionVal: userPositionVal,
      UserImgVal: userImgVal,
    };
    // req-to-db
    addUser(req, (status, response) => {
      if (status) {
        console.log(response);
      }
      if (!status) {
        console.error(response);
        const alert = uiAlertFail(response);
        $("#user-create #failed").html(alert);
        const modalBody = $("#user-create .modal-body").get(0);
        modalBody.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  });
