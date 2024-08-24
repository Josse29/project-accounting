import {
  readAccounting1,
  sumCredit,
  sumDebt,
} from "../../../../../serverless-side/functions/accounting.js";
import { formatRupiah2 } from "../../../utils/formatRupiah.js";
import { uiTbody, uiTbodyZero } from "./ui.js";

$(document).ready(function () {
  sumDebt((status, response) => {
    if (status) {
      const rupiah = formatRupiah2(response);
      $("th#accounting-debt").text(rupiah);
    }
    if (!status) {
      console.error(response);
    }
  });
  sumCredit((status, response) => {
    if (status) {
      const rupiah = formatRupiah2(response);
      $("th#accounting-credit").text(rupiah);
    }
    if (!status) {
      console.error(response);
    }
  });
  readAccounting1((status, response) => {
    if (status) {
      let tbody = ``;
      if (response.length >= 1) {
        response.forEach((rows) => {
          tbody += uiTbody(rows);
        });
        $("tbody#balance-sheet").html(tbody);
      }
      if (response.length < 1) {
        $("tbody#balance-sheet").html(uiTbodyZero);
      }
    }
    if (!status) {
      console.error(response);
    }
  });
});
