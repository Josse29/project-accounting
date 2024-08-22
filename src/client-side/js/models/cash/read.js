import { readCash } from "../../../../serverless-side/functions/cash.js";
import { uiTbody } from "./ui.js";

$(document).ready(function () {
  readCash((status, response) => {
    if (status) {
      let tbody = ``;
      console.log(response);
      response.forEach((rows) => {
        tbody += uiTbody(rows);
      });
      $("tbody#cash").html(tbody);
      //   <tbody id="cash"></tbody>
    }
    if (!status) {
      console.log(response);
    }
  });
});
