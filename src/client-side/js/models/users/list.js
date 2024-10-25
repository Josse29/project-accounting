import { getListCustomer, getListSales } from "./services.js";

const listSales = async () => {
  // user sales
  const { status, response } = await getListSales();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled >Choose One Of Sales</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Sales Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(resSales);
  }
};
const listCustomer = async () => {
  // user customer id
  const { status, response } = await getListCustomer();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Customers</option>`;
    if (existed1) {
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option disabled class="fst-italic text-center">Customers Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
  }
};
export const listUserRefSalesCreate = async () => {
  const sales = await listSales();
  $("select#order-create-usersalesid").html(sales);
  const customer = await listCustomer();
  $("select#order-create-usercustomerid").html(customer);
};
export const listUserRefSalesRead = async () => {
  const sales = await listSales();
  $("select#sales-read-personid").html(sales);
  const customer = await listCustomer();
  $("select#sales-read-customerid").html(customer);
};
export const listUserRefSalesReadDate = async () => {
  const sales = await listSales();
  $("select#sales-read-personid-date").html(sales);
  const customer = await listCustomer();
  $("select#sales-read-customerid-date").html(customer);
};
