// Menggunakan findIndex untuk menemukan index elemen 3
const index = await window.electronAPI.lodashAPI.findIndex([1, 2, 3, 4, 5], 3);
console.log(index);

// Menggunakan last untuk mendapatkan elemen terakhir
const lastElement = await window.electronAPI.lodashAPI.last([1, 2, 3, 4, 5]);
console.log(lastElement);

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
