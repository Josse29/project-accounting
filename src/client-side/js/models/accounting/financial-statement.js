import { getAccountingFinancialStatementAPI } from "./services.js";
import { uiFinancialStatement } from "./ui.js";

const { status, response } = await getAccountingFinancialStatementAPI();
if (status) {
  uiFinancialStatement(response);
}
if (!status) {
  throw new Error(response);
}
