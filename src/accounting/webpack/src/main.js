import "./css/style.css";
import "./vendor/bootstrap.css";

import "./vendor/bootstrap.js";
import "./vendor/jquery.js";
import "./vendor/swal.js";

$("button").on("click", () => {
  console.log("hello world");
  Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success",
  });
});
