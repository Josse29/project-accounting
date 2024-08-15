import { register } from "../../../../serverless-side/functions/users.js";
import {
  uiHidePassword,
  uiHidePasswordConfirm,
  uishowConfirmPassword,
  uiShowPassword,
} from "./ui.js";

$(document).ready(function () {
  $("#email").focus();
  $("#toggle-password").on("change", function () {
    if ($(this).is(":checked")) {
      $(".toggle-password").html(uiShowPassword());
      $("#password").attr("type", "text");
    }
    if (!$(this).is(":checked")) {
      $(".toggle-password").html(uiHidePassword());
      $("#password").attr("type", "password");
    }
  });
  $("#toggle-confirm-password").on("change", function () {
    if ($(this).is(":checked")) {
      $(".toggle-confirm-password").html(uishowConfirmPassword());
      $("#confirmPassword").attr("type", "text");
    }
    if (!$(this).is(":checked")) {
      $(".toggle-confirm-password").html(uiHidePasswordConfirm());
      $("#confirmPassword").attr("type", "password");
    }
  });
  // function regsiter
  $("#register").on("click", () => {
    const email = $("#email").val();
    const fullname = $("#fullname").val();
    const password = $("#password").val();
    // const img = $("input#user-create-img").val();
    const confirmPassword = $("input#confirmPassword").val();
    const position = $("select#user-create-position").val();
    const req = { email, fullname, password, confirmPassword, position };
    register(req, (status, response) => {
      if (status) {
        console.log(response);
        // blankValue();
        $("#email").focus();
      }
      if (!status) {
        console.error(response);
      }
    });
  });
});
