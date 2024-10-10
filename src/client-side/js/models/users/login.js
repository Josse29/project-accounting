import { fetchLimitOffset } from "./services.js";

$("#email").focus();
$("#toggle-password").on("change", function () {
  // show password
  if ($(this).is(":checked")) {
    let showPassword = `<label
                          class="fa-solid fa-eye-slash me-2 show-password"
                          for="toggle-password"
                          ></label>`;
    $(".toggle-password").html(showPassword);
    $("#password").attr("type", "text");
    console.log("tset");
  } else {
    // hide password
    let hidePassword = `<label
                          class="fa-solid fa-eye me-2 hide-password"
                          for="toggle-password"
                        ></label>`;
    $(".toggle-password").html(hidePassword);
    $("#password").attr("type", "password");
  }
});
// 2. get user based on page
const req = {
  searchVal: "",
  limitVal: 2,
  offsetVal: 1,
};
getByPage(req);
async function getByPage(req) {
  const users = await fetchLimitOffset(req);
  const status = users.status;
  if (status) {
    const response = users.response;
    console.log(response);
  }
  if (!status) {
    console.error(users.response);
  }
}
