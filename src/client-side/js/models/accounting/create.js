import { disFormatRupiah1, formatRupiah1 } from "../../utils/formatPrice.js";
import { productListRefStock, productListRefStock2 } from "../products/list.js";
import {
  listCreditor,
  listCustomer,
  listCustomer1,
  listDebt,
  listInvestor,
  listSales,
  listSupplier,
  listUser,
} from "../users/list.js";
import {
  createAccountingAPI,
  createAccounting1API,
  createAccounting2API,
  createAccounting3API,
  createAccounting4API,
  createAccounting5API,
  createAccounting6API,
  createAccounting7API,
  createAccounting8API,
  createAccounting9API,
  createAccounting10API,
  createAccounting11API,
  createAccounting12API,
  createAccounting13API,
  createAccounting15API,
  createAccounting17API,
  createAccounting18API,
  createAccounting19API,
  createAccounting20API,
  createAccounting21API,
  createAccounting14API,
  createAccounting16API,
  getAccountingCashAPI,
} from "./services.js";
import {
  uiAlertFail,
  uiAlertFail1,
  uiAlertFail2,
  uiAlertSuccess,
  uiListAsset,
  uiProductMode,
  uiProductMode1,
  uiProductMode2,
  uiProductMode3,
  uiProductMode4,
  uiProductMode5,
  uiReset,
  uiReset1,
  uiReset2,
} from "./ui.js";
import { getAccountingAllAPI } from "./utils.js";
import formatPercentage from "../../utils/formatPercentage.js";
import handleBackspace from "../../utils/handleBackspace.js";
import { terbilangIndonesia } from "../../utils/formatNumberWord.js";

// 1. Cash In
// choose the method and others value
$("div#accountingCashInModal select#cashin_method")
  .off("change")
  .on("change", async function () {
    const selectedMethod = $(this).val();
    // 1. cash-in-investment
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
      <!-- Balance -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Balance</label>
        <input
          type="text"
          class="form-control mb-2"
          id="cashin_price"
          placeholder="$ 10.0"
        />
        <p class="fs-6 fst-italic text-end text-capitalize" id="numbers-word"></p>
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
    // 2. cash-in-product-sale
    if (selectedMethod === "product") {
      const productList = await productListRefStock2();
      const listCustomer1 = await listCustomer();
      const listSales1 = await listSales();
      uiProductMode(productList, listCustomer1, listSales1);
    }
    // 3. cash-in-liability
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
      <div class="mb-4">
        <label for="cashin_price" class="form-label fs-4">Balance</label>
        <input
          type="text"
          class="form-control mb-2"
          id="cashin_price"
          placeholder="$ 10.0"
        />
        <p class="fs-6 fst-italic text-end text-capitalize" id="numbers-word"></p>
      </div>
      <!-- interest -->
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <label for="cashin_interest" class="form-label fs-4 mb-0">Interest</label>
        <input
          type="text"
          class="form-control fs-5 border-0 text-end shadow-none"
          id="cashin_interest"
          placeholder="0%"
          style="width:80px;"
        />
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
    // 4. cash-in-receivable
    if (selectedMethod === "receivable") {
      // or receivable lisst
      const listCustomer2 = await listCustomer1();
      const div = `
      <!-- sales user id -->
      <div class="mb-3">
        <label for="customerid" class="form-label fs-4">Customer</label>
        <select id="customerid" class="form-control text-capitalize">
          ${listCustomer2}
        </select>
      </div>
      <!-- price -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Balance</label>
        <input
          type="text"
          class="form-control mb-2"
          id="cashin_price"
          placeholder="$ 10.0"
        />
        <p class="fs-6 fst-italic text-end text-capitalize" id="numbers-word"></p>
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
    // 5. cash-in-return-product-buy
    if (selectedMethod === "return-product") {
      const productList = await productListRefStock();
      uiProductMode1(productList);
    }
    // 6. cash-in-asset-sell
    if (selectedMethod === "asset") {
      const listAsset = await uiListAsset();
      const listUser1 = await listUser();
      const div = `
      <!-- asset name -->
      <div class="mb-3">
        <label for="asset-name" class="form-label fs-4">Asset</label>
        <select id="asset-name" class="form-select">
          ${listAsset}
        </select>
      </div>
      <!-- asset price sell -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Asset Sell</label>
        <input type="text" class="form-control mb-2" id="cashin_price" placeholder="Ex : $ 10.000"/>
        <p id="numbers-word" class="text-end fst-italic text-capitalize"></p>
      </div>
      <!-- asset-email -->
      <div class="mb-3">
        <label for="asset-email" class="form-label fs-4">Contact Person</label>
        <select id="asset-email" class="form-select text-capitalize">
          ${listUser1}
        </select>
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="cashin_info" class="form-label fs-4">Furhter Information</label>
        <textarea id="cashin_info" class="form-control"></textarea>
      </div>
      `;
      $("#cashin_other_value div.activity").html(div);
    }
    // 7. cash-in-others
    if (selectedMethod === "others") {
      const div = `
      <!-- title -->
      <div class="mb-3">
        <label for="title" class="form-label fs-4"> Revenue Name : </label>
        <input type="text" class="form-control text-capitalize" id="title" placeholder="Ex : Donation, Government, Miscellaneous"/>
      </div>
      <!-- balance -->
      <div class="mb-3">
        <label for="cashin_price" class="form-label fs-4">Balance</label>
        <input type="text" class="form-control mb-2" id="cashin_price" placeholder="$ 10.00" />
        <p id="numbers-word" class="text-end fst-italic text-capitalize"></p>
      </div>
      <!-- information -->
      <div>
        <label for="information" class="form-label fs-4"> Information </label>
        <textarea id="information" class="form-control"></textarea>
      </div>
      `;
      $("#cashin_other_value div.activity").html(div);
    }
    // Format as Rupiah when input
    $("div#accountingCashInModal .activity input#cashin_price")
      .off("input")
      .on("input", function () {
        $("p#numbers-word").text(
          terbilangIndonesia(disFormatRupiah1($(this).val()))
        );
        let formattedValue = formatRupiah1($(this).val());
        $(this).val(formattedValue);
      });
    // function interest
    $("input#cashin_interest")
      .off("input")
      .on("input", function () {
        const formatted = formatPercentage($(this).val());
        $(this).val(formatted);
      })
      .off("keydown")
      .on("keydown", function (event) {
        handleBackspace(event, $(this));
      });
  });

// send to server
$("div#accountingCashInModal button#cashin_create")
  .off("click")
  .on("click", async () => {
    const accountingDateVal = $(
      "#accountingCashInModal input#cashin_date"
    ).val();
    const accountingTimeVal = $(
      "#accountingCashInModal input#cashin_time"
    ).val();
    const accountingMethod = $(
      "#accountingCashInModal select#cashin_method"
    ).val();
    const accountingInfoVal = $(
      "#accountingCashInModal textarea#cashin_info"
    ).val();

    // 1. cash-in-investment
    if (accountingMethod === "investment") {
      const accountingBalanceVal = disFormatRupiah1(
        $("#cashin_other_value input#cashin_price").val()
      );
      const selectedInvestor = $("select#investor");
      const accountingInvestorNameVal = $(selectedInvestor)
        .find("option:selected")
        .data("userfullname");
      const accountingInvestorEmailVal = $(selectedInvestor)
        .find("option:selected")
        .data("useremail");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingInvestorNameVal,
        accountingInvestorEmailVal,
        accountingBalanceVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccountingAPI(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
    // 2. cash-in-product-sale
    if (accountingMethod === "product") {
      // product
      const productSelected = $("div#cashin_other_value select#product");
      const accountingProductIdVal = $(productSelected).val();
      const accountingProductNameVal = $(productSelected)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceSellVal = parseFloat(
        $(productSelected).find("option:selected").data("pricesell")
      );
      const accountingProductQtyVal = $(
        "div#cashin_other_value input#qty"
      ).val();
      const accountingProductDiscountVal = $("input#interest")
        .val()
        .replace("%", "");
      // sale
      const accountingSaleNameVal = $(
        "div#cashin_other_value select#saleuserid"
      )
        .find("option:selected")
        .data("userfullname");
      // customer
      const customerSelected = $("select#customeruserid");
      const accountingCustomerNameVal = $(customerSelected)
        .find("option:selected")
        .data("userfullname");
      const accountingCustomerEmailVal = $(customerSelected)
        .find("option:selected")
        .data("useremail");
      // accounting total balance
      const accountingBalanceTotalVal =
        accountingProductPriceSellVal * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingProductDiscountVal,
        accountingBalanceTotalVal,
        accountingCustomerNameVal,
        accountingCustomerEmailVal,
        accountingSaleNameVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting4API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
    // 3. cash-in-liability
    if (accountingMethod === "liability") {
      const selectedCreditor = $("select#creditor-user-id");
      const accountingLiabilityNameVal = $(selectedCreditor)
        .find("option:selected")
        .data("userfullname");
      const accountingLiabilityEmailVal = $(selectedCreditor)
        .find("option:selected")
        .data("useremail");
      const accountingBalanceTotalVal = disFormatRupiah1(
        $("#cashin_other_value input#cashin_price").val()
      );
      const accountingLiabilityInterestVal = $("input#cashin_interest")
        .val()
        .replace("%", "");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingLiabilityNameVal,
        accountingLiabilityEmailVal,
        accountingBalanceTotalVal,
        accountingLiabilityInterestVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting6API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
    // 4. cash-in-receivable
    if (accountingMethod === "receivable") {
      const selectedCustomer = $("select#customerid");
      const accountingCustomerNameVal = $(selectedCustomer)
        .find("option:selected")
        .data("userfullname");
      const accountingCustomerEmailVal = $(selectedCustomer)
        .find("option:selected")
        .data("useremail");
      const accountingBalanceTotalVal = disFormatRupiah1(
        $("#cashin_other_value input#cashin_price").val()
      );
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingReceivableNameVal: accountingCustomerNameVal,
        accountingReceivableEmailVal: accountingCustomerEmailVal,
        accountingBalanceTotalVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting8API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
    // 5. cash-in-return-product-buy
    if (accountingMethod === "return-product") {
      // product
      const productSelected = $("div#cashin_other_value select#product");
      const accountingProductIdVal = $(productSelected).val();
      const accountingProductNameVal = $(productSelected)
        .find("option:selected")
        .data("productname");
      const accountingPriceBuy = parseFloat(
        $(productSelected).find("option:selected").data("pricebuy")
      );
      const accountingProductQtyVal = $(
        "div#cashin_other_value input#qty"
      ).val();
      const accountingProductDiscountVal = $("input#interest")
        .val()
        .replace("%", "");
      // suppplier
      const accountingSupplierEmailVal = $(productSelected)
        .find("option:selected")
        .data("supplieremail");
      // accounting total balance
      const accountingBalanceTotalVal =
        accountingPriceBuy * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingProductDiscountVal,
        accountingBalanceTotalVal,
        accountingSupplierEmailVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting13API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
    // 6. cash-in-asset-sell
    if (accountingMethod === "asset") {
      const assetSelected = $("select#asset-name");
      const accountingAssetNameVal = $(assetSelected)
        .find("option:selected")
        .data("assetname");
      const accountingAssetPriceBuyVal = $(assetSelected)
        .find("option:selected")
        .data("assetbalance");
      const accountingAssetPriceSellVal = disFormatRupiah1(
        $("input#cashin_price").val()
      );
      const accountingAssetTypeVal = $(assetSelected)
        .find("option:selected")
        .data("assettype");
      const accountingAssetEmailVal = $("select#asset-email")
        .find("option:selected")
        .data("useremail");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingAssetNameVal,
        accountingAssetPriceBuyVal,
        accountingAssetPriceSellVal,
        accountingAssetTypeVal,
        accountingAssetEmailVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting15API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
    // 7. cash-in-others
    if (accountingMethod === "others") {
      const accountingNameVal = $("input#title").val();
      const accountingBalanceVal = disFormatRupiah1(
        $("input#cashin_price").val()
      );
      const accountingInfoVal = $("textarea#information").val();
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingNameVal,
        accountingBalanceVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting16API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset();
      }
      if (!status) {
        uiAlertFail1(response);
        throw new Error(response);
      }
    }
  });

// 2. Cash Out
// 1. method
$("div#accountingCashOutModal select#cashout_method")
  .off("change")
  .on("change", async function () {
    const selected = $(this).val();
    // 1. cash-out-asset-buy
    if (selected === "asset") {
      const listSupplier1 = await listSupplier();
      const div = `
      <!-- cashBalance  -->
      <div class="mb-3">
        <label for="cash-balance" class="form-label fs-4">Cash Available</label>
        <input type="text" class="form-control" id="cash-balance" readonly />
      </div>
      <!-- asset -->
      <div class="mb-3">
        <label for="asset-name" class="form-label fs-4">Asset Name</label>
        <input type="text" class="form-control text-capitalize" id="asset-name" placeholder="Ex: Land, Build, Prepaid Insurance" />
      </div>
      <!-- asset type -->
      <div class="mb-3">
        <label for="asset-type" class="form-label fs-4">Asset Type</label>
        <select id="asset-type" class="form-select">
          <option value="121">Fixed Asset</option>
          <option value="113">Current Asset</option>
        </select>
      </div>
      <!-- balance -->
      <div class="mb-3">
        <label for="asset-price" class="form-label fs-4">Asset Price</label>
        <input
          type="text"
          class="form-control mb-2"
          id="asset-price"
          placeholder="$ 10,00"
        />
        <p class="fs-6 text-end text-capitalize fst-italic" id="numbers-word"></p>
      </div>
      <!-- asset supplier -->
      <div class="mb-3">
        <label for="asset-supplier" class="form-label fs-4">Contact</label>
        <select id="asset-supplier" class="form-select text-capitalize">
          ${listSupplier1}
        </select>
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
      // function convert rupiah and numbers word
      $("div#cashout_other_value input#asset-price")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // 2. cash-out-product-buy
    if (selected === "product") {
      const productList = await productListRefStock();
      uiProductMode2(productList);
    }
    // 3. cash-out-expense-buy
    if (selected === "expense") {
      const listUser1 = await listUser();
      const div = `
      <!-- cashBalance  -->
      <div class="mb-3">
        <label for="cash-balance" class="form-label fs-4">Cash Available</label>
        <input type="text" class="form-control" id="cash-balance" readonly />
      </div>
      <!-- expense -->
      <div class="mb-4">
        <label for="expense-name" class="form-label fs-4">Expense Name</label>
        <input id="expense-name" class="form-control text-capitalize" placeholder="Ex : Advertising Expense, etc Expense" />
      </div>
      <!-- price -->
      <div class="mb-4">
        <label for="expense-price" class="form-label fs-4">Expense Price</label>
        <input id="expense-price" class="form-control mb-2" placeholder="Ex : $ 10,00"/>
        <p id="numbers-word" class="text-end fst-italic text-capitalize"></p>
      </div>
      <!-- email -->
      <div id="liability" class="mb-3">
        <label for="supplier" class="form-label fs-4">Contact</label>
        <select id="supplier" class="form-select text-capitalize">
          ${listUser1}
        </select>
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
      $("div#cashout_other_value input#expense-price")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // 4. cash-out-liability
    if (selected === "liability") {
      const creditorList = await listDebt();
      const div = `
      <!-- cashBalance  -->
      <div class="mb-3">
        <label for="cash-balance" class="form-label fs-4">Cash Available</label>
        <input type="text" class="form-control" id="cash-balance" readonly />
      </div>
      <!-- liability -->
      <div id="liability" class="mb-3">
        <label for="creditors-list" class="form-label fs-4">Account Debt</label>
        <select id="creditors-list" class="form-select text-capitalize">
          ${creditorList}
        </select>
      </div>
      <!-- balance -->
      <div class="mb-3">
        <label for="creditor-balance" class="form-label fs-4">Balance</label>
        <input
          type="text"
          class="form-control mb-2"
          id="creditor-balance"
          placeholder="$ 10,00"
        />
        <p id="numbers-word" class="text-end fst-italic text-capitalize"></p>
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
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // 5. cash-out-return-product-sale
    if (selected === "return-product-sale") {
      const productList = await productListRefStock2();
      const listSales1 = await listSales();
      const listCustomer1 = await listCustomer();
      uiProductMode3(productList, listCustomer1, listSales1, selected);
    }
    // 6. cash-out-withdrawl-investment
    if (selected === "withdrawl-investment") {
      const listInvestor1 = await listInvestor();
      const div = `
      <!-- cashBalance  -->
      <div class="mb-3">
        <label for="cash-balance" class="form-label fs-4">Cash Available</label>
        <input type="text" class="form-control" id="cash-balance" readonly />
      </div>
      <!-- list investor -->
      <div class="mb-3">
        <label for="investor" class="form-label fs-4">Investor</label>
        <select id="investor" class="form-select text-capitalize">
          ${listInvestor1}
        </select>
      </div>
      <!-- Balance -->
      <div class="mb-3">
        <label for="cashout_price" class="form-label fs-4">Balance</label>
        <input
          type="text"
          class="form-control mb-2"
          id="cashout_price"
          placeholder="$ 10.0"
        />
      <p class="fs-6 text-end text-capitalize fst-italic" id="numbers-word"></p>
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
      </div>  `;
      $("#accountingCashOutModal div.activity").html(div);
      $("div#cashout_other_value input#cashout_price")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // function value cash balance
    const { status, response } = await getAccountingCashAPI();
    if (status) {
      $("input#cash-balance").val(formatRupiah1(response));
    } else {
      throw new Error(response);
    }
  });
// send to server
$("div#accountingCashOutModal button#cashout_create")
  .off("click")
  .on("click", async () => {
    const accountingDateVal = $("input#cashout_date").val();
    const accountingTimeVal = $("input#cashout_time").val();
    const accountingMethod = $("select#cashout_method").val();
    const accountingInfoVal = $("textarea#cashout_info").val();
    // 1. cash-out-asset-buy
    if (accountingMethod === "asset") {
      const accountingAssetNameVal = $(
        "div#cashout_other_value input#asset-name"
      ).val();
      const accountingAssetTypeVal = $("select#asset-type").val();
      const accountingAssetPriceVal = disFormatRupiah1(
        $("input#asset-price").val()
      );
      const accountingAssetEmail = $("select#asset-supplier")
        .find("option:selected")
        .data("useremail");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingAssetNameVal,
        accountingAssetTypeVal,
        accountingAssetPriceVal,
        accountingAssetEmail,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting1API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset1();
      }
      if (!status) {
        uiAlertFail(response);
        throw new Error(response);
      }
    }
    // 2. cash-out-product-buy
    if (accountingMethod === "product") {
      // product
      const productSelected = $("div#cashout_other_value select#product");
      const accountingProductIdVal = $(productSelected).val();
      const accountingProductNameVal = $(productSelected)
        .find("option:selected")
        .data("productname");
      const accountingProductPrice = $(productSelected)
        .find("option:selected")
        .data("pricebuy");
      const accountingProductDiscountVal = $("input#interest")
        .val()
        .replace("%", "");
      const accountingProductQtyVal = $(
        "div#cashout_other_value input#qty-1"
      ).val();
      // supplier
      const accountingSupplierEmailVal = $(productSelected)
        .find("option:selected")
        .data("supplieremail");
      const accountingBalanceTotalVal =
        accountingProductPrice * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingProductDiscountVal,
        accountingBalanceTotalVal,
        accountingSupplierEmailVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting2API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset1();
      }
      if (!status) {
        uiAlertFail(response);
        throw new Error(response);
      }
    }
    // 3. cash-out-expense-buy
    if (accountingMethod === "expense") {
      const accountingExpenseNameVal = $("input#expense-name").val();
      const accountingExpenseEmailVal = $("select#supplier")
        .find("option:selected")
        .data("useremail");
      const accountingExpensePriceVal = disFormatRupiah1(
        $("input#expense-price").val()
      );
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingExpenseNameVal,
        accountingExpensePriceVal,
        accountingExpenseEmailVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting3API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset1();
      }
      if (!status) {
        uiAlertFail(response);
        throw new Error(response);
      }
    }
    // 4. cash-out-liability
    if (accountingMethod === "liability") {
      const creditorSelected = $(
        "div#cashout_other_value select#creditors-list"
      );
      const accountingLiabilityNameVal = $(creditorSelected)
        .find("option:selected")
        .data("userfullname");
      const accountingLiabilityEmailVal = $(creditorSelected)
        .find("option:selected")
        .data("useremail");
      const accountingBalanceTotalVal = disFormatRupiah1(
        $("input#creditor-balance").val()
      );
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingLiabilityNameVal,
        accountingLiabilityEmailVal,
        accountingBalanceTotalVal,
        accountingInfoVal,
      };
      // return false;
      const { status, response } = await createAccounting7API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset1();
      }
      if (!status) {
        uiAlertFail(response);
        throw new Error(response);
      }
    }
    // 5. cash-out-return-product-sale
    if (accountingMethod === "return-product-sale") {
      // product
      const productSelected = $("select#product");
      const accountingProductIdVal = $(productSelected).val();
      const accountingProductNameVal = $(productSelected)
        .find("option:selected")
        .data("productname");
      const accountingProductPrice = $(productSelected)
        .find("option:selected")
        .data("pricesell");
      const accountingProductQtyVal = parseFloat(
        $("div#cashout_other_value input#qty-1").val()
      );
      const accountingProductDiscountVal = $("input#interest")
        .val()
        .replace("%", "");
      // customer
      const customerSelected = $("select#customeruserid");
      const accountingCustomerNameVal = $(customerSelected)
        .find("option:selected")
        .data("userfullname");
      const accountingCustomerEmailVal = $(customerSelected)
        .find("option:selected")
        .data("useremail");
      // sales
      const saleSelected = $("select#saleuserid");
      const accountingSaleNameVal = $(saleSelected)
        .find("option:selected")
        .data("userfullname");
      // total balance
      const accountingBalanceTotalVal =
        accountingProductPrice * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingProductDiscountVal,
        accountingBalanceTotalVal,
        accountingCustomerNameVal,
        accountingCustomerEmailVal,
        accountingSaleNameVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting9API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset1();
      }
      if (!status) {
        uiAlertFail(response);
        throw new Error(response);
      }
    }
    // 6. cash-out-withdrawl-investment
    if (accountingMethod === "withdrawl-investment") {
      const selectedInvestor = $("select#investor");
      const accountingInvestorNameVal = $(selectedInvestor)
        .find("option:selected")
        .data("userfullname");
      const accountingInvestorEmailVal = $(selectedInvestor)
        .find("option:selected")
        .data("useremail");
      const accountingBalanceVal = disFormatRupiah1(
        $("input#cashout_price").val()
      );
      const accountingInfoVal = $("textarea#cashout_info").val();
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingInvestorNameVal,
        accountingInvestorEmailVal,
        accountingBalanceVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting17API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset1();
      }
      if (!status) {
        uiAlertFail(response);
        throw new Error(response);
      }
    }
  });

// non affaect cash
$("div#accounting-create-etc select#accounting-method")
  .off("change")
  .on("change", async function () {
    const selectedMethod = $(this).val();
    // 1. etc-investment-asset
    if (selectedMethod === "investment-with-asset") {
      const listInvestor1 = await listInvestor();
      const div = `
      <!-- asset -->
      <div class="mb-3">
        <label for="asset-1" class="form-label fs-4">Asset Name</label>
         <input type="text" id="asset-1" class="form-control text-capitalize" placeholder="Ex : Land, Build, Machine" />
      </div>
      <!-- fixed asset -->
      <div class="mb-3">
        <label for="asset-type" class="form-label fs-4">Asset Type</label>
        <select id="asset-type" class="form-select">
          <option value="121">Asset Fixed</option>
          <option value="113">Asset Current</option>
        </select>
      </div>
      <!-- price asset -->
      <div class="mb-3">
        <label for="asset-price" class="form-label fs-4">Asset Price</label>
        <input type="text" id="asset-price" class="form-control text-capitalize mb-2" placeholder="Ex : $ 10.00" />
        <p id="numbers-word" class="fst-italic text-end text-capitalize"></p>
      </div>     
      <!-- investor -->
      <div class="mb-3">
        <label for="investor-1" class="form-label fs-4">Investor</label>
        <select id="investor-1" class="form-control text-capitalize">
          ${listInvestor1}
        </select>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div> 
      `;
      $("div#accounting-create-etc div#activity").html(div);
      // function convert rupiah and numbers word
      $("input#asset-price")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // 2. etc-asset-buy-credit
    if (selectedMethod === "purchase-asset-on-credit") {
      const listSupplier1 = await listSupplier();
      const div = `
      <!-- asset -->
      <div class="mb-3">
        <label for="asset-name" class="form-label fs-4">Asset</label>
        <input type="text" class="form-control text-capitalize" id="asset-name" placeholder="Ex : Build, Land, Machine" />
      </div>
      <!-- asset type  -->
      <div class="mb-3">
        <label for="asset-type" class="form-label fs-4">Asset Type</label>
        <select id="asset-type" class="form-select">
          <option value="121">Fixed Asset</option>
          <option value="113">Current Asset</option>
        </select>
      </div>
      <!-- price -->
      <div class="mb-3">
        <label for="asset-price" class="form-label fs-4">Asset Price</label>
        <input type="text" class="form-control mb-2" id="asset-price" placeholder="Ex : $10.00" />
        <p id="numbers-word" class="text-capitalize text-end fst-italic"></p>
      </div>
      <!-- interest -->
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <label for="etc-interest" class="form-label fs-4 mb-0">Interest</label>
        <input
          type="text"
          class="form-control fs-5 border-0 text-end shadow-none"
          id="etc-interest"
          placeholder="0%"
          style="width: 80px"
        />
      </div>
      <!-- supplier -->
      <div class="mb-3">
        <label for="supplier" class="form-label fs-4">Supplier</label>
        <select id="supplier" class="form-select text-capitalize">
          ${listSupplier1}
        </select>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div> 
      `;
      $("div#accounting-create-etc div#activity").html(div);
      // function interest
      $("input#etc-interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
        });
      // function convert rupiah and numbers word
      $("input#asset-price")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // 3. etc-product-sale-credit
    if (selectedMethod === "sale-product-on-credit") {
      const listProduct = await productListRefStock2();
      const listCustomer1 = await listCustomer();
      const listSale = await listSales();
      uiProductMode5(listProduct, listCustomer1, listSale);
    }
    // 4. etc-product-buy-credit
    if (selectedMethod === "purchase-product-on-credit") {
      const listProduct = await productListRefStock();
      uiProductMode4(listProduct);
    }
    // 5.etc-return-product-buy-credit
    if (selectedMethod === "return-purchase-product-on-credit") {
      const listProduct = await productListRefStock();
      uiProductMode4(listProduct);
    }
    // 6. etc-return-product-sale-credit
    if (selectedMethod === "return-sale-product-on-credit") {
      const listProduct = await productListRefStock2();
      const listCustomer1 = await listCustomer();
      const listSale = await listSales();
      uiProductMode5(listProduct, listCustomer1, listSale);
    }
    // 7. etc-withdrawl-investment-asset
    if (selectedMethod === "return-investment-with-asset") {
      const listInvestor1 = await listInvestor();
      const uiListAsset2 = await uiListAsset();
      const div = `
      <!-- asset -->
      <div class="mb-3">
        <label for="asset-1" class="form-label fs-4">Asset</label>
        <select id="asset-1" class="form-control text-capitalize">
          ${uiListAsset2}
        </select>
      </div>
      <!-- investor -->
      <div class="mb-3">
        <label for="investor-1" class="form-label fs-4">Investor</label>
        <select id="investor-1" class="form-control text-capitalize">
          ${listInvestor1}
        </select>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div> `;
      $("div#accounting-create-etc div#activity").html(div);
    }
    // 8.etc-accumulation-asset
    if (selectedMethod === "acc-fixed-asset") {
      const listAsset1 = await uiListAsset();
      const div = `
      <!-- asset -->
      <div class="mb-3">
        <label for="asset-1" class="form-label fs-4">Asset Name</label>
        <select id="asset-1" class="form-control text-capitalize">
          ${listAsset1}
        </select>
      </div>
      <!-- Asset Value Use -->
      <div class="mb-3">
        <label for="asset-use" class="form-label fs-4">Asset Value Use</label>
        <input type="text" class="form-control mb-2" id="asset-use" placeholder="Ex : $ 10,00" />
        <p id="numbers-word" class="text-end fst-italic text-capitalize"></p>
      </div>
      <!-- information -->
      <div>
        <label for="accounting-info" class="form-label fs-4">Information : </label>
        <textarea id="accounting-info" class="form-control"></textarea>
      </div> 
      `;
      $("div#accounting-create-etc div#activity").html(div);
      // function convert rupiah and numbers word
      $("input#asset-use")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
    // 9.etc-asset-sell-credit
    if (selectedMethod === "sale-asset-on-credit") {
      const listAsset1 = await uiListAsset();
      const listUser1 = await listUser();
      const div = `
      <!-- asset -->
      <div class="mb-3">
        <label for="asset" class="form-label fs-4">Asset</label>
        <select id="asset" class="form-select text-capitalize">
          ${listAsset1}
        </select>
      </div>
      <!-- price sell -->
      <div class="mb-3">
        <label for="pricesell" class="form-label fs-4">Asset Price Sell</label>
        <input type="text" class="form-control mb-2" id="pricesell" placeholder="Ex : $ 10.00" />
        <p id="numbers-word" class="text-capitalize text-end fst-italic"></p>
      </div>
      <!-- interest -->
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <label for="interest" class="form-label fs-4 mb-0">Interest</label>
        <input
          type="text"
          class="form-control fs-5 border-0 text-end shadow-none"
          id="interest"
          placeholder="0%"
          style="width: 80px"
        />
      </div>
      <!-- supplier -->
      <div class="mb-3">
        <label for="supplier" class="form-label fs-4">Supplier</label>
        <select id="supplier" class="form-select text-capitalize">
          ${listUser1}
        </select>
      </div>
      <!-- further information -->
      <div class="mb-3">
        <label for="information" class="form-label fs-4">Further Information</label>
        <textarea id="information" class="form-control"></textarea>
      </div>      
      `;
      $("div#accounting-create-etc div#activity").html(div);
      // function interest
      $("input#interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
        });
      // function convert rupiah and numbers word
      $("input#pricesell")
        .off("input")
        .on("input", function () {
          $("p#numbers-word").text(
            terbilangIndonesia(disFormatRupiah1($(this).val()))
          );
          let formattedValue = formatRupiah1($(this).val());
          $(this).val(formattedValue);
        });
    }
  });
// send to server
$("div#accounting-create-etc .modal-footer button.btn-primary")
  .off("click")
  .on("click", async () => {
    const accountingDateVal = $("input#accounting-date").val();
    const accountingTimeVal = $("input#accounting-time").val();
    const selectedMethod = $(
      "div#accounting-create-etc select#accounting-method"
    ).val();
    const accountingInfoVal = $("textarea#accounting-info").val();
    // 1.etc-investment-asset
    if (selectedMethod === "investment-with-asset") {
      // asset
      const accountingAssetNameVal = $("input#asset-1").val();
      const accountingAssetTypeVal = $("select#asset-type").val();
      const accountingAssetPriceVal = disFormatRupiah1(
        $("input#asset-price").val()
      );
      // investor
      const selectedInvestor = $("select#investor-1");
      const accountingInvestorEmailVal = $(selectedInvestor)
        .find("option:selected")
        .data("useremail");
      const accountingInvestorNameVal = $(selectedInvestor)
        .find("option:selected")
        .data("userfullname");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingInvestorNameVal,
        accountingInvestorEmailVal,
        accountingAssetTypeVal,
        accountingAssetNameVal,
        accountingAssetPriceVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting10API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 2.etc-asset-buy-credit
    if (selectedMethod === "purchase-asset-on-credit") {
      const accountingAssetNameVal = $("input#asset-name").val();
      const accountingAssetPriceVal = disFormatRupiah1(
        $("input#asset-price").val()
      );
      const accountingAssetTypeVal = $("select#asset-type").val();
      const selectedSupplier = $("select#supplier");
      const accountingUserFullnameVal = selectedSupplier
        .find("option:selected")
        .data("userfullname");
      const accountingUserEmailVal = selectedSupplier
        .find("option:selected")
        .data("useremail");
      const accountingAssetInterestVal = $("input#etc-interest")
        .val()
        .replace("%", "");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingAssetNameVal,
        accountingAssetTypeVal,
        accountingAssetPriceVal,
        accountingAssetInterestVal,
        accountingUserFullnameVal,
        accountingUserEmailVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting18API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 2. etc-product-sale-credit
    if (selectedMethod === "sale-product-on-credit") {
      // product
      const selectedProduct = $("select#product-1");
      const accountingProductIdVal = $(selectedProduct).val();
      const accountingProductNameVal = $(selectedProduct)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceSellVal = parseFloat(
        $(selectedProduct).find("option:selected").data("pricesell")
      );
      const accountingProductQtyVal = parseFloat(
        $("div#accounting-create-etc input#qty-2").val()
      );
      const accountingProductInterestVal = $("#etc-interest")
        .val()
        .replace("%", "");
      // sales
      const selectedSale = $("select#user-sale-id");
      const accountingSaleNameVal = $(selectedSale)
        .find("option:selected")
        .data("userfullname");
      // customer
      const selectedCustomer = $("select#user-customer-id");
      const accountingCustomerNameVal = $(selectedCustomer)
        .find("option:selected")
        .data("userfullname");
      const accountingCustomerEmailVal = $(selectedCustomer)
        .find("option:selected")
        .data("useremail");
      // total balance
      const accountingBalanceTotalVal =
        accountingProductPriceSellVal * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingBalanceTotalVal,
        accountingProductInterestVal,
        accountingCustomerNameVal,
        accountingCustomerEmailVal,
        accountingSaleNameVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting5API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 3. etc-product-buy-credit
    if (selectedMethod === "purchase-product-on-credit") {
      // product
      const selectedProduct = $("select#product-1");
      const accountingProductIdVal = $(selectedProduct).val();
      const accountingProductNameVal = $(selectedProduct)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceBuyVal = parseFloat(
        $(selectedProduct).find("option:selected").data("pricebuy")
      );
      const accountingProductQtyVal = parseFloat(
        $("div#accounting-create-etc input#qty-2").val()
      );
      const accountingProductInterestVal = $("input#etc-interest")
        .val()
        .replace("%", "");
      // supplier
      const accountingSupplierNameVal = $(selectedProduct)
        .find("option:selected")
        .data("suppliername");
      const accontingSupplierEmailVal = $(selectedProduct)
        .find("option:selected")
        .data("supplieremail");
      // total balance
      const accountingBalanceTotalVal =
        accountingProductPriceBuyVal * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingProductInterestVal,
        accountingBalanceTotalVal,
        accontingSupplierEmailVal,
        accountingSupplierNameVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting11API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 4. etc-return-product-buy-credit
    if (selectedMethod === "return-purchase-product-on-credit") {
      // product
      const selectedProduct = $("select#product-1");
      const accountingProductIdVal = $(selectedProduct).val();
      const accountingProductNameVal = $(selectedProduct)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceBuyVal = parseFloat(
        $(selectedProduct).find("option:selected").data("pricebuy")
      );
      const accountingProductQtyVal = parseFloat(
        $("div#accounting-create-etc input#qty-2").val()
      );
      const accountingProductInterestVal = $("input#etc-interest")
        .val()
        .replace("%", "");
      // user
      const accountingSupplierNameVal = $(selectedProduct)
        .find("option:selected")
        .data("suppliername");
      const accountingSupplierEmailVal = $(selectedProduct)
        .find("option:selected")
        .data("supplieremail");
      // total balance
      const accountingBalanceTotalVal =
        accountingProductPriceBuyVal * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingProductInterestVal,
        accountingBalanceTotalVal,
        accountingSupplierEmailVal,
        accountingSupplierNameVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting12API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 6. etc-return-product-sale-credit
    if (selectedMethod === "return-sale-product-on-credit") {
      // product
      const selectedProduct = $("select#product-1");
      const accountingProductIdVal = $(selectedProduct).val();
      const accountingProductNameVal = $(selectedProduct)
        .find("option:selected")
        .data("productname");
      const accountingProductPriceSellVal = parseFloat(
        $(selectedProduct).find("option:selected").data("pricesell")
      );
      const accountingProductQtyVal = parseFloat(
        $("div#accounting-create-etc input#qty-2").val()
      );
      const accountingProductInterestVal = $("#etc-interest")
        .val()
        .replace("%", "");
      // sales
      const selectedSale = $("select#user-sale-id");
      const accountingSaleNameVal = $(selectedSale)
        .find("option:selected")
        .data("userfullname");
      // customer
      const selectedCustomer = $("select#user-customer-id");
      const accountingCustomerNameVal = $(selectedCustomer)
        .find("option:selected")
        .data("userfullname");
      const accountingCustomerEmailVal = $(selectedCustomer)
        .find("option:selected")
        .data("useremail");
      // total balance
      const accountingBalanceTotalVal =
        accountingProductPriceSellVal * accountingProductQtyVal;
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingProductIdVal,
        accountingProductNameVal,
        accountingProductQtyVal,
        accountingBalanceTotalVal,
        accountingProductInterestVal,
        accountingCustomerNameVal,
        accountingCustomerEmailVal,
        accountingSaleNameVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting19API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 7. etc-withdrawls-investment-asset
    if (selectedMethod === "return-investment-with-asset") {
      // asset
      const selectedAsset = $("select#asset-1");
      const accountingAssetNameVal = $(selectedAsset)
        .find("option:selected")
        .data("assetname");
      const accountingAssetTypeVal = $(selectedAsset)
        .find("option:selected")
        .data("assettype");
      const accountingAssetPriceVal = $(selectedAsset)
        .find("option:selected")
        .data("assetbalance");
      // investor
      const selectedInvestor = $("select#investor-1");
      const accountingInvestorEmailVal = $(selectedInvestor)
        .find("option:selected")
        .data("useremail");
      const accountingInvestorNameVal = $(selectedInvestor)
        .find("option:selected")
        .data("userfullname");
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingInvestorNameVal,
        accountingInvestorEmailVal,
        accountingAssetTypeVal,
        accountingAssetNameVal,
        accountingAssetPriceVal,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting20API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    // 8. etc-accumulation-asset
    if (selectedMethod === "acc-fixed-asset") {
      const assetSelected = $("select#asset-1");
      const accountingAssetNameVal = $(assetSelected)
        .find("option:selected")
        .data("assetname");
      const accountingAssetTypeVal = $(assetSelected)
        .find("option:selected")
        .data("assettype");
      const accountingAssetPriceVal = $(assetSelected)
        .find("option:selected")
        .data("assetbalance");
      const accountingAssetValueUse = disFormatRupiah1(
        $("input#asset-use").val()
      );
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingAssetNameVal,
        accountingAssetTypeVal,
        accountingAssetPriceVal,
        accountingAssetValueUse,
        accountingInfoVal,
      };
      const { status, response } = await createAccounting14API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
    if (selectedMethod === "sale-asset-on-credit") {
      // 9. etc-asset-sell-credit
      const assetSelected = $("select#asset");
      const accountingAssetNameVal = $(assetSelected)
        .find("option:selected")
        .data("assetname");
      const accountingAssetBalanceVal = $(assetSelected)
        .find("option:selected")
        .data("assetbalance");
      const accountingAssetPriceSellVal = disFormatRupiah1(
        $("input#pricesell").val()
      );
      const accountingAssetTypeVal = $(assetSelected)
        .find("option:selected")
        .data("assettype");
      const selectedSupplier = $("select#supplier");
      const accountingSupplierFullnameVal = $(selectedSupplier)
        .find("option:selected ")
        .data("userfullname");
      const accountingSupplierEmailVal = $(selectedSupplier)
        .find("option:selected")
        .data("useremail");
      const accountingAssetInterestVal = $("input#interest")
        .val()
        .replace("%", "");
      const accountingAssetInfoVal = $("textarea#information").val();
      const req = {
        accountingDateVal,
        accountingTimeVal,
        accountingAssetNameVal,
        accountingAssetTypeVal,
        accountingAssetBalanceVal,
        accountingAssetPriceSellVal,
        accountingSupplierFullnameVal,
        accountingSupplierEmailVal,
        accountingAssetInterestVal,
        accountingAssetInfoVal,
      };
      const { status, response } = await createAccounting21API(req);
      if (status) {
        await getAccountingAllAPI();
        uiAlertSuccess(response);
        uiReset2();
      }
      if (!status) {
        uiAlertFail2(response);
        throw new Error(response);
      }
    }
  });
