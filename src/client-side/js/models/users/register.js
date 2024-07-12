import { register } from "../../../../serverless-side/functions/users.js";
import { getUsersAgain } from "./read.js";
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
      $(".toggle-password").html(uiShowPassword);
      $("#password").attr("type", "text");
    }
    if (!$(this).is(":checked")) {
      $(".toggle-password").html(uiHidePassword);
      $("#password").attr("type", "password");
    }
  });
  $("#toggle-confirm-password").on("change", function () {
    if ($(this).is(":checked")) {
      $(".toggle-confirm-password").html(uishowConfirmPassword);
      $("#confirmPassword").attr("type", "text");
    }
    if (!$(this).is(":checked")) {
      $(".toggle-confirm-password").html(uiHidePasswordConfirm);
      $("#confirmPassword").attr("type", "password");
    }
  });
  // function regsiter
  $("#register").on("click", () => {
    const email = $("#email").val();
    const fullname = $("#fullname").val();
    const password = $("#password").val();
    register(email, fullname, password, (status, response) => {
      if (status) {
        console.log(response);
        getUsersAgain();
        // blankValue();
        $("#email").focus();
      }
      if (!status) {
        console.error(response);
      }
    });
  });
});
