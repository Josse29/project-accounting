import { register } from "../../../../serverless-side/functions/users.js";
import { getUsersAgain } from "./read.js";
$(document.ready(function () {
    $("#email").focus();
    $("#toggle-password").on("change", function () {
        if ($(this).is(":checked")) {
            let showPassword = `<label
                          class="fa-solid fa-eye-slash me-2 show-password"
                          for="toggle-password"
                          ></label>`;
            $(".toggle-password").html(showPassword);
            $("#password").attr("type", "text");
        } else {
            let hidePassword = `<label
                              class="fa-solid fa-eye me-2 hide-password"
                              for="toggle-password"
                              </label>`;
            $(".toggle-password").html(hidePassword);
            $("#password").attr("type", "password");
        }
    });
    $("#toggle-confirm-password").on("change", function () {
        if ($(this).is(":checked")) {
            let showPassword = `<label
                          class="fa-solid fa-eye-slash me-2 show-password"
                          for="toggle-confirm-password"
                          ></label>`;
            $(".toggle-confirm-password").html(showPassword);
            $("#confirmPassword").attr("type", "text");
        } else {
            let hidePassword = `<label
                              class="fa-solid fa-eye me-2 hide-password"
                              for="toggle-confirm-password"
                              </label>`;
            $(".toggle-confirm-password").html(hidePassword);
            $("#confirmPassword").attr("type", "password");
        }
    });
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
}))