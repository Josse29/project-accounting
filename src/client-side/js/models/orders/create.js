import { createAccounting } from "../../../../serverless-side/functions/accounting.js";
import { createCash } from "../../../../serverless-side/functions/cash.js";
import { createPersediaan1 } from "../../../../serverless-side/functions/persediaan.js";
import { createSales } from "../../../../serverless-side/functions/sales.js";
import { table } from "../../component/table/index.js";
import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatRupiah.js";
import { terbilangIndonesia } from "../../utils/formatTerbilang.js";
import { getTimeNow } from "../../utils/formatWaktu.js";
import {
  getStorageCart,
  getStorageCartSum,
  removeStorageCart,
  removeStorageCartSUM,
} from "../../utils/localStorage.js";
import { getSalesAgain } from "../sales/read.js";
import { listUserRefSalesCreate } from "../users/list.js";
import { getProductAgain } from "./read.js";
