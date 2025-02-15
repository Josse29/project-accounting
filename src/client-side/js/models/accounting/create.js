import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { previewLoadImg } from "../../utils/loadImg.js";
import { listAsset } from "../assetlist/list.js";
import { getCashAll } from "../cash/utils.js";
import { getEquityAll } from "../equity/utils.js";
import {
  productListRefPersediaan,
  productListRefPersediaan2,
} from "../products/list.js";
import {
  listCreditor,
  listCustomer,
  listInvestor,
  listSales,
} from "../users/list.js";
import { addAccounting1 } from "./services.js";
import { uiAlertFailed3, uiAlertSuccess, uiReset } from "./ui.js";
import { getAccountingAll } from "./utils.js";
import listExpense from "./../expenselist/list.js";

// increase cash  =
// 1. a receipt of investor with cash
// 2. a receipt of sales with cash
// 3. a receipt of payable / debt with cash
// 4. a receipt of return purchasement account purchase with cash
// 4. a receipt of return purchasement expenses with cash
// 5. a receipt of receivable with cash

// decrease cash =
// 1. a prive of investor with cash
// 2. a payment of return sales with cash
// 3. a payment of payable / debt with cash
// 4. a payment of purchasement account purchase with cash
// 5. a payment of purchasement expenses with cash
// 6. a payment of dividend

// payable =
// + : [receivable cash from creditors, purchasement asset/purchase/expenses with credit ]
// - : [payment to creditors]
// receivable
//  + : [sales with credit]
// - : [payment from customers who purchase with credit]

// 1. Cash In
// choose the method and others value
$("select#cashin_method")
  .off("change")
  .on("change", async function () {
    const selectedMethod = $(this).val();
    // 1.invest
    if (selectedMethod === "investment") {
      const listInvestor1 = await listInvestor();
      const div = `
      <!-- list investor -->
      <div class="mb-3">
        <label for="investor" class="form-label fs-4">Investor</label>
        <select id="investor" class="form-select text-capitalize">
          ${listInvestor1}
        </select>
      </div>
      <!-- price -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Price</label>
        <input
          type="text"
          class="form-control"
          id="cashin_price"
          placeholder="$ 10.0"
        />
      </div>
      <!-- image -->
      <div class="mb-3">
        <label for="cashin_img" class="form-label fs-4">Image</label>
        <!-- section img -->
        <div class="position-relative d-none" id="section_img">
          <i
            class="fa-solid fa-circle-xmark text-danger"
            style="
              position: absolute;
              right: -10px;
              top: -22px;
              font-size: 32px;
              cursor: pointer;
            "
            id="cancel_img"
          ></i>
          <img src="" alt="" class="w-100 h-auto mb-3" id="preview_img" />
        </div>
        <input class="form-control" type="file" id="cashin_img" />
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashin_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashin_info"
        ></textarea>
      </div>
      `;
      $("#cashin_other_value div.activity").html(div);
    }
    // 2. sale
    if (selectedMethod === "sale") {
      const productList = await productListRefPersediaan2();
      const listSales1 = await listSales();
      const listCustomer1 = await listCustomer();
      const div = `
      <!-- product -->
      <div class="mb-4">
        <label for="product" class="form-label fs-4">Product</label>
        <select id="product" class="form-control">
          ${productList}
        </select>
      </div>
      <!-- qty -->
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              value="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- customer user id -->
      <div class="mb-3">
        <label for="customeruserid" class="form-label fs-4">Customers</label>
        <select id="customeruserid" class="form-control text-capitalize">
          ${listCustomer1}
        </select>
      </div>
      <!-- sales user id -->
      <div class="mb-3">
        <label for="saleuserid" class="form-label fs-4">Sales</label>
        <select id="saleuserid" class="form-control text-capitalize">
          ${listSales1}
        </select>
      </div>
      <!-- image -->
      <div class="mb-3">
        <label for="cashin_img" class="form-label fs-4">Image</label>
        <!-- section img -->
        <div class="position-relative d-none" id="section_img">
          <i
            class="fa-solid fa-circle-xmark text-danger"
            style="
              position: absolute;
              right: -10px;
              top: -22px;
              font-size: 32px;
              cursor: pointer;
            "
            id="cancel_img"
          ></i>
          <img src="" alt="" class="w-100 h-auto mb-3" id="preview_img" />
        </div>
        <input class="form-control" type="file" id="cashin_img" />
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashin_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashin_info"
        ></textarea>
      </div>
      `;
      $("#cashin_other_value div.activity").html(div);
    }
    // 3. payable
    if (selectedMethod === "liability") {
      const listCreditor1 = await listCreditor();
      const div = `
      <!-- list creditor -->
      <div class="mb-3">
        <label for="creditor-user-id" class="form-label fs-4">Creditor</label>
        <select id="creditor-user-id" class="form-control text-capitalize">
          ${listCreditor1}
        </select>
      </div>
      <!-- price -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Price</label>
        <input
          type="text"
          class="form-control"
          id="cashin_price"
          placeholder="$ 10.0"
        />
      </div>
      <!-- image -->
      <div class="mb-3">
        <label for="cashin_img" class="form-label fs-4">Image</label>
        <!-- section img -->
        <div class="position-relative d-none" id="section_img">
          <i
            class="fa-solid fa-circle-xmark text-danger"
            style="
              position: absolute;
              right: -10px;
              top: -22px;
              font-size: 32px;
              cursor: pointer;
            "
            id="cancel_img"
          ></i>
          <img src="" alt="" class="w-100 h-auto mb-3" id="preview_img" />
        </div>
        <input class="form-control" type="file" id="cashin_img" />
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashin_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashin_info"
        ></textarea>
      </div>
      `;
      $("#cashin_other_value div.activity").html(div);
    }
    // 4. receivable
    if (selectedMethod === "receivable") {
      // or receivable lisst
      const listCustomer1 = await listCustomer();
      const div = `
      <!-- sales user id -->
      <div class="mb-3">
        <label for="customerid" class="form-label fs-4">Customer</label>
        <select id="customerid" class="form-control text-capitalize">
          ${listCustomer1}
        </select>
      </div>
      <!-- price -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Price</label>
        <input
          type="text"
          class="form-control"
          id="cashin_price"
          placeholder="$ 10.0"
        />
      </div>
      <!-- image -->
      <div class="mb-3">
        <label for="cashin_img" class="form-label fs-4">Image</label>
        <!-- section img -->
        <div class="position-relative d-none" id="section_img">
          <i
            class="fa-solid fa-circle-xmark text-danger"
            style="
              position: absolute;
              right: -10px;
              top: -22px;
              font-size: 32px;
              cursor: pointer;
            "
            id="cancel_img"
          ></i>
          <img src="" alt="" class="w-100 h-auto mb-3" id="preview_img" />
        </div>
        <input class="form-control" type="file" id="cashin_img" />
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashin_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashin_info"
        ></textarea>
      </div>
      `;
      $("#cashin_other_value div.activity").html(div);
    }

    // Format as Rupiah when input
    $("div#accountingCashInModal .activity input#cashin_price")
      .off("input")
      .on("input", function () {
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
    // function-increase-decrease-qty
    let qty = $("div#cashin_other_value input#qty").val();
    // decrase
    $("div#cashin_other_value button#decrease")
      .off("click")
      .on("click", function () {
        qty--;
        $("div#cashin_other_value input#qty").val(qty);
      });
    // input
    $("div#cashin_other_value input#qty")
      .off("keyup")
      .on("keyup", function () {
        qty = $(this).val();
      });
    // increase
    $("div#cashin_other_value button#increase")
      .off("click")
      .on("click", function () {
        qty++;
        $("div#cashin_other_value input#qty").val(qty);
      });
    // preview-image
    const args = {
      inputImg: $("div#accountingCashInModal input#cashin_img"),
      sectionImg: $("div#accountingCashInModal div#section_img"),
      previewImg: $("div#accountingCashInModal img#preview_img"),
    };
    previewLoadImg(args);
    // cancel img
    $("div#accountingCashInModal i#cancel_img")
      .off("click")
      .on("click", () => {
        $("div#accountingCashInModal input#cashin_img").val("");
        $("div#accountingCashInModal div#section_img").addClass("d-none");
      });
  });

// send to server
$("div#accountingCashInModal button#cashin_create")
  .off("click")
  .on("click", async () => {
    const accountingDate = $("#accountingCashInModal input#cashin_date").val();
    const accountingTime = $("#accountingCashInModal input#cashin_time").val();
    const accountingMethod = $(
      "#accountingCashInModal select#cashin_method"
    ).val();
    const accountingImg = $("#accountingCashInModal input#cashin_img")[0].files;
    const accountingInfo = $(
      "#accountingCashInModal textarea#cashin_info"
    ).val();
    // 1.investment
    if (accountingMethod === "investment") {
      const accountingPrice = disFormatRupiah1(
        $("#cashin_other_value input#cashin_price").val()
      );
      const selectedInvestor = $("select#investor");
      const accountingInvestorId = $(selectedInvestor).val();
      const accountingInvestorName = $(selectedInvestor)
        .find("option:selected")
        .text();
      const req = {
        accountingDate,
        accountingTime,
        accountingInvestorId,
        accountingInvestorName,
        accountingPrice,
        accountingImg,
        accountingInfo,
      };
      console.log(req);
      return false;
      const { status, response } = await addAccounting1(req);
      if (status) {
        await getCashAll();
        await getEquityAll();
        await getAccountingAll();
        uiAlertSuccess(response);
        uiReset();
        $("#accountingCashInModal").modal("hide");
      }
      if (!status) {
        uiAlertFailed3(response);
        const modalBody = $(
          "#accountingCashInModal .modal-content .modal-body"
        ).get(0);
        modalBody.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        throw new Error(response);
      }
    }
    // 2.sale
    if (accountingMethod === "sale") {
      // product
      const productSelected = $("div#cashin_other_value select#product");
      const accountingProductId = $(productSelected).val();
      const accountingProductName = $(productSelected)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceBuy = $(productSelected)
        .find("option:selected")
        .data("pricebuy");
      const accountingProductPriceSell = $(productSelected)
        .find("option:selected")
        .data("pricesell");

      // sale
      const saleSelected = $("div#cashin_other_value select#saleuserid");
      const accountingSaleId = $(saleSelected).val();
      const accountingSaleName = $(saleSelected).find("option:selected").text();
      // customer
      const customerSelected = $("select#customeruserid");
      const accountingCustomerId = $(customerSelected).val();
      const accountingCustomerName = $(customerSelected)
        .find("option:selected")
        .text();

      const accountingQty = parseFloat(
        $("div#cashin_other_value input#qty").val()
      );
      const req = {
        accountingDate,
        accountingTime,
        accountingProductId,
        accountingProductName,
        accountingProductPriceBuy,
        accountingProductPriceSell,
        accountingCustomerId,
        accountingCustomerName,
        accountingSaleId,
        accountingSaleName,
        accountingQty,
        accountingImg,
        accountingInfo,
      };
      console.log(req);
    }
    // 3.liabiliy
    if (accountingMethod === "liability") {
      const selectedCreditor = $("select#creditor-user-id");
      const accountingCreditorId = $(selectedCreditor).val();
      const accountingCreditorName = $(selectedCreditor)
        .find("option:selected")
        .text()
        .trim();
      const accountingPrice = disFormatRupiah1(
        $("#cashin_other_value input#cashin_price").val()
      );
      const req = {
        accountingDate,
        accountingTime,
        accountingCreditorId,
        accountingCreditorName,
        accountingPrice,
        accountingImg,
        accountingInfo,
      };
      console.log(req);
    }
    // 4.receivable
    if (accountingMethod === "receivable") {
      const selectedCustomer = $("select#customerid");
      const accountingCustomerId = $(selectedCustomer).val();
      const accountingCustomerName = $(selectedCustomer)
        .find("option:selected")
        .text();
      const accountingBalance = disFormatRupiah1(
        $("#cashin_other_value input#cashin_price").val()
      );

      const req = {
        accountingDate,
        accountingTime,
        accountingCustomerId,
        accountingCustomerName,
        accountingBalance,
        accountingImg,
        accountingInfo,
      };
      console.log(req);
    }
  });

// 2. Cash Out
// 1. method
$("div#accountingCashOutModal select#cashout_method")
  .off("change")
  .on("change", async function () {
    const selected = $(this).val();
    if (selected === "asset") {
      const listAsset1 = await listAsset();
      const div = `
      <!-- asset -->
      <div id="asset" class="mb-4">
        <label for="asset-list" class="form-label fs-4">Asset</label>
        <select id="asset-list" class="form-select text-capitalize">
          ${listAsset1}
        </select>
      </div>
      <!-- qty -->
      <div id="qty-method" class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty-1" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty-1"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              value="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashout_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashout_info"
        ></textarea>
      </div>      
      `;
      $("#accountingCashOutModal div.activity").html(div);
    }
    if (selected === "purchase") {
      const productList = await productListRefPersediaan();
      const div = `
      <!-- productlist  -->
      <div class="mb-4">
        <label for="product-list" class="form-label fs-4">Product</label>
        <select id="product-list" class="form-select text-capitalize">
          ${productList}
        </select>
      </div>
      <!-- qty -->
      <div id="qty-method" class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty-1" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty-1"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              value="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashout_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashout_info"
        ></textarea>
      </div>    
      `;
      $("#accountingCashOutModal div.activity").html(div);
    }
    if (selected === "expense") {
      const listExpense1 = await listExpense();
      const div = `
      <!-- expense -->
      <div id="expense" class="mb-4">
        <label for="expense-list" class="form-label fs-4">Expense</label>
        <select id="expense-list" class="form-select text-capitalize">
          ${listExpense1}
        </select>
      </div>
      <!-- qty -->
      <div id="qty-method" class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty-1" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty-1"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              value="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashout_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashout_info"
        ></textarea>
      </div>
      `;
      $("#accountingCashOutModal div.activity").html(div);
    }
    if (selected === "liability") {
      const creditorList = await listCreditor();
      const div = `
      <!-- liability -->
      <div id="liability" class="mb-3">
        <label for="creditors-list" class="form-label fs-4">Creditor</label>
        <select id="creditors-list" class="form-select text-capitalize">
          ${creditorList}
        </select>
      </div>
      <!-- balance -->
      <div class="mb-3">
        <label for="creditor-balance" class="form-label fs-4">Balance</label>
        <input
          type="text"
          class="form-control"
          id="creditor-balance"
          placeholder="$ 10,00"
        />
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashout_info" class="form-label fs-4">Information</label>
        <textarea
          class="form-control"
          placeholder="furhter information"
          style="height: 100px"
          id="cashout_info"
        ></textarea>
      </div>
      `;
      $("#accountingCashOutModal div.activity").html(div);
      $("div#cashout_other_value input#creditor-balance")
        .off("input")
        .on("input", function () {
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // function-increase-decrease-qty
    let qty = $("div#cashout_other_value input#qty").val();
    // decrase
    $("div#cashout_other_value button#decrease")
      .off("click")
      .on("click", function () {
        qty--;
        $("div#cashout_other_value input#qty").val(qty);
      });
    // input
    $("div#cashout_other_value input#qty")
      .off("keyup")
      .on("keyup", function () {
        qty = $(this).val();
      });
    // increase
    $("div#cashout_other_value button#increase")
      .off("click")
      .on("click", function () {
        qty++;
        $("div#cashout_other_value input#qty").val(qty);
      });
  });
// send to server
$("div#accountingCashOutModal button#cashout_create")
  .off("click")
  .on("click", async () => {
    const accountingDateVal = $("input#cashout_date").val();
    const accountingTimeVal = $("input#cashout_time").val();
    const accountingMethod = $("select#cashout_method").val();
    const accountingQty = parseFloat(
      $("div#cashout_other_value input#qty").val()
    );
    const accountingInfoVal = $("textarea#cashout_info").val();
    // 1.asset
    if (accountingMethod === "asset") {
      const assetSelected = $("div#cashout_other_value select#asset-list");
      const accountingAssetIdVal = $(assetSelected).val();
      const accountingAssetBalance = parseFloat(
        $(assetSelected).find("option:selected").data("assetbalance")
      );
      const accountingAssetNameVal = $(assetSelected)
        .find("option:selected")
        .data("assetname");
      const accountingBalanceTotalVal = accountingAssetBalance * accountingQty;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingAssetIdVal,
        accountingAssetNameVal,
        accountingBalanceTotalVal,
        accountingInfoVal,
      };
      console.log(req);
    }
    // 2.purchase
    if (accountingMethod === "purchase") {
      const productSelected = $("div#cashout_other_value select#product-list");
      const accountingProductIdVal = parseInt($(productSelected).val());
      const accountingProductNameVal = $(productSelected)
        .find("option:selected")
        .data("productname");
      const accountingProductPrice = parseFloat(
        $(productSelected).find("option:selected").data("pricebuy")
      );
      const accountingBalanceTotalVal = accountingProductPrice * accountingQty;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingBalanceTotalVal,
        accountingInfoVal,
      };
      console.log(req);
    }
    // 3.expense
    if (accountingMethod === "expense") {
      const expenseSelected = $("#cashout_other_value select#expense-list");
      const accountingExpenseIdVal = parseInt($(expenseSelected).val());
      const accountingExpenseNameVal = $(expenseSelected)
        .find("option:selected")
        .data("expensename");
      const accountingExpenseBalance = parseFloat(
        $(expenseSelected).find("option:selected").data("expensebalance")
      );
      const accountingBalanceTotalVal =
        accountingExpenseBalance * accountingQty;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingExpenseIdVal,
        accountingExpenseNameVal,
        accountingBalanceTotalVal,
        accountingInfoVal,
      };
      console.log(req);
    }
    // 4.liability
    if (accountingMethod === "liability") {
      const creditorSelected = $(
        "div#cashout_other_value select#creditors-list"
      );
      const accountingLiabilityIdVal = $(creditorSelected).val();
      const accountingLiabilityNameVal = $(creditorSelected)
        .find("option:selected")
        .text()
        .trim();
      const accountingBalanceTotalVal = disFormatRupiah1(
        $("input#creditor-balance").val()
      );
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingLiabilityIdVal,
        accountingLiabilityNameVal,
        accountingBalanceTotalVal,
        accountingInfoVal,
      };
      console.log(req);
    }
  });

// non affaect cash
$("div#accounting-create-etc select#accounting-method")
  .off("change")
  .on("change", async function () {
    const selectedMethod = $(this).val();
    // 1.investmentWithAsset
    if (selectedMethod === "investment-with-asset") {
      const listAsset1 = await listAsset();
      const listInvestor1 = await listInvestor();
      const div = `
      <!-- asset -->
      <div class="mb-3">
        <label for="asset-1" class="form-label fs-4">Asset</label>
        <select id="asset-1" class="form-control text-capitalize">
          ${listAsset1}
        </select>
      </div>      
      <!-- investor -->
      <div class="mb-3">
        <label for="investor-1" class="form-label fs-4">Investor</label>
        <select id="investor-1" class="form-control text-capitalize">
          ${listInvestor1}
        </select>
      </div>
      <!-- qty -->
      <div class="d-flex justify-content-between align-items-center w-100 mb-3">
        <label for="qty-2" class="form-label fs-4">Qty</label>
        <div class="d-flex align-items-center">
          <!-- decrease -->
          <button id="decrease" class="btn btn-danger fs-4">-</button>
          <input
            id="qty-2"
            type="text"
            class="form-control fs-3 mx-2 p-1 text-center"
            value="0"
            style="width: 80px"
          />
          <!-- increase -->
          <button id="increase" class="btn btn-success fs-4">+</button>
        </div>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div> 
      `;
      $("div#accounting-create-etc div#activity").html(div);
    }
    // 2.purchaseAssetOnCredit
    if (selectedMethod === "purchase-asset-on-credit") {
      const listAsset1 = await listAsset();
      console.log(listAsset1);
    }
    // 3.saleProductCredit
    if (selectedMethod === "sale-product-on-credit") {
      const listProduct = await productListRefPersediaan2();
      const listCustomer1 = await listCustomer();
      const listSale = await listSales();
      const div = `
      <!-- product -->
      <div class="mb-3">
        <label for="product-1" class="form-label fs-4">Product </label>
        <select id="product-1" class="form-control text-capitalize">
          ${listProduct}
        </select>
      </div>
      <!-- qty -->
      <div class="d-flex justify-content-between align-items-center w-100 mb-3">
        <label for="qty-2" class="form-label fs-4">Qty</label>
        <div class="d-flex align-items-center">
          <!-- decrease -->
          <button id="decrease" class="btn btn-danger fs-4">-</button>
          <input
            id="qty-2"
            type="text"
            class="form-control fs-3 mx-2 p-1 text-center"
            value="0"
            style="width: 80px"
          />
          <!-- increase -->
          <button id="increase" class="btn btn-success fs-4">+</button>
        </div>
      </div>      
      <!-- customer -->
      <div class="mb-3">
        <label for="user-customer-id" class="form-label fs-4">Customer</label>
        <select id="user-customer-id" class="form-control text-capitalize">
          ${listCustomer1}
        </select>
      </div>
      <!-- sales -->
      <div class="mb-3">
        <label for="user-sale-id" class="form-label fs-4">Sale</label>
        <select id="user-sale-id" class="form-control text-capitalize">
          ${listSale}
        </select>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div>       
      `;
      $("div#accounting-create-etc div#activity").html(div);
    }
    // 4.purchaseProductOnCredit
    if (selectedMethod === "purchase-product-on-credit") {
      const listProduct = await productListRefPersediaan();
      const div = `
      <!-- product -->
      <div class="mb-3">
        <label for="product-1" class="form-label fs-4">Product </label>
        <select id="product-1" class="form-control text-capitalize">
          ${listProduct}
        </select>
      </div>
      <!-- qty -->
      <div class="d-flex justify-content-between align-items-center w-100 mb-3">
        <label for="qty-2" class="form-label fs-4">Qty</label>
        <div class="d-flex align-items-center">
          <!-- decrease -->
          <button id="decrease" class="btn btn-danger fs-4">-</button>
          <input
            id="qty-2"
            type="text"
            class="form-control fs-3 mx-2 p-1 text-center"
            value="0"
            style="width: 80px"
          />
          <!-- increase -->
          <button id="increase" class="btn btn-success fs-4">+</button>
        </div>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div>  
      `;
      $("div#accounting-create-etc div#activity").html(div);
    }
    // function-increase-decrease-qty
    let qty = $("div#accounting-create-etc input#qty-2").val();
    // decrase
    $("div#accounting-create-etc button#decrease")
      .off("click")
      .on("click", function () {
        qty--;
        $("div#accounting-create-etc input#qty-2").val(qty);
      });
    // input
    $("div#accounting-create-etc input#qty-2")
      .off("keyup")
      .on("keyup", function () {
        qty = $(this).val();
      });
    // increase
    $("div#accounting-create-etc button#increase")
      .off("click")
      .on("click", function () {
        qty++;
        $("div#accounting-create-etc input#qty-2").val(qty);
      });
  });
// send to server
$("div#accounting-create-etc .modal-footer button.btn-primary")
  .off("click")
  .on("click", () => {
    const accountingDate = $("input#accounting-date").val();
    const accountingTime = $("input#accounting-time").val();
    const selectedMethod = $(
      "div#accounting-create-etc select#accounting-method"
    ).val();
    const accountinqty = parseFloat(
      $("div#accounting-create-etc input#qty-2").val()
    );
    const accountingInfo = $("textarea#accounting-info").val();
    // 1.investment with asset
    if (selectedMethod === "investment-with-asset") {
      // asset
      const selectedAsset = $("select#asset-1");
      const accountingAssetId = parseInt($(selectedAsset).val());
      const accountingAssetName = $(selectedAsset)
        .find("option:selected")
        .data("assetname");
      // investor
      const selectedInvestor = $("select#investor-1");
      const accountingInvestorId = parseInt($(selectedInvestor).val());
      const accountingInvestorName = $(selectedInvestor)
        .find("option:selected")
        .text();
      const accountingAssetBalance = parseFloat(
        selectedAsset.find("option:selected").data("assetbalance")
      );
      const accountingBalanceTotal = accountingAssetBalance * accountinqty;
      const req = {
        accountingDate,
        accountingTime,
        accountingAssetId,
        accountingAssetName,
        accountingInvestorId,
        accountingInvestorName,
        accountingBalanceTotal,
        accountingInfo,
      };
      console.log(req);
    }
    // 2.sales product on credit
    if (selectedMethod === "sale-product-on-credit") {
      // product
      const selectedProduct = $("select#product-1");
      const accountingProductId = parseInt($(selectedProduct).val());
      const accountingProductName = $(selectedProduct)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceSell = parseFloat(
        $(selectedProduct).find("option:selected").data("pricesell")
      );
      // sales
      const selectedSale = $("select#user-sale-id");
      const accountingSaleId = $(selectedSale).val();
      const accountingSaleName = $(selectedSale).find("option:selected").text();
      // customer
      const selectedCustomer = $("select#user-customer-id");
      const accountingCustomerId = $(selectedCustomer).val();
      const accountingCustomerName = $(selectedCustomer)
        .find("option:selected")
        .text();
      // tota balance
      const accountingBalanceTotal = accountingProductPriceSell * accountinqty;
      const req = {
        accountingDate,
        accountingTime,
        accountingProductId,
        accountingProductName,
        accountingBalanceTotal,
        accountingCustomerId,
        accountingCustomerName,
        accountingSaleId,
        accountingSaleName,
        accountingInfo,
      };
      console.log(req);
    }
    // 3. purchase product on credit
    if (selectedMethod === "purchase-product-on-credit") {
      // product
      const selectedProduct = $("select#product-1");
      const accountingProductId = parseInt($(selectedProduct).val());
      const accountingProductName = $(selectedProduct)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceBuy = parseFloat(
        $(selectedProduct).find("option:selected").data("pricebuy")
      );
      // tota balance
      const accountingBalanceTotal = accountingProductPriceBuy * accountinqty;
      const req = {
        accountingDate,
        accountingTime,
        accountingProductId,
        accountingProductName,
        accountingBalanceTotal,
        accountingInfo,
      };
      console.log(req);
    }
  });
