import { getUsers, insertUsers } from "../query-execute/users.js";
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
// CRUD_OPERATION
// Function to clear input fields
const blankValue = () => {
    $("#email").val("");
    $("#password").val("");
    $("#fullname").val("");
};
// get alluser
getUsers((status, response) => {
    if (status) {
        let li = ``;
        response.forEach((element) => {
            li += `<li data-id=${element.id}>${element.fullname}</li>`;
        });
        $("#testData").html(li);
    }
    if (!status) {
        console.error(response);
        throw response;
    }
});
// get alluser again
const getUserAgain = () => {
    getUsers((status, response) => {
        if (status) {
            let li = ``;
            response.forEach((element) => {
                li += `<li data-id=${element.id}>${element.fullname}</li>`;
            });
            $("#testData").html(li);
        }
        if (!status) {
            console.error(response);
            throw response;
        }
    });
};
// register
$("#register").on("click", () => {
    const email = $("#email").val();
    const password = $("#password").val();
    const fullname = $("#fullname").val();
    insertUsers(email, fullname, password, (status, response) => {
        if (status) {
            console.log(response);
            getUserAgain();
            // blankValue();
            $("#email").focus();
        }
        if (!status) {
            console.error(response);
        }
    });
});
