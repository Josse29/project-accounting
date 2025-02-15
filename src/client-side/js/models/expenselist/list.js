import { formatRupiah2 } from "../../utils/formatPrice.js";
import { getExpenseListAPI } from "./services.js";

const listExpense = async () => {
  const { status, response } = await getExpenseListAPI();
  if (status) {
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option += `
      <option selected disabled>Choose One Of Expenses</option>
      `;
      response.forEach((row) => {
        const expenseId = row.ExpenseId;
        const expenseName = row.ExpenseName;
        const expensePrice = row.ExpensePrice;
        option += `
        <option
        value="${expenseId}"
        data-expensename="${expenseName}"
        data-expenseprice="${expensePrice}"
        >
        ${expenseName} - ${formatRupiah2(expensePrice)}
        </option>
        `;
      });
    }
    if (!existed) {
      option += `
      <option selected disabled class="text-capitalize text-muted text-center">expense is empty.....</option>
      `;
    }
    return option;
  }
};
export default listExpense;
