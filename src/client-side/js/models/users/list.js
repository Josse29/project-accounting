import {
  getCustomer,
  getSales,
} from "../../../../serverless-side/functions/users.js";

export const listUserRefSalesCreate = async () => {
  try {
    // for user sales
    const userSales = await getSales();
    let option1 = `<option selected disabled>Choose One Of Sales</option>`;
    userSales.forEach((el) => {
      option1 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
    });
    $("select#order-create-usersalesid").html(option1);
    // for user customer
    const userCustomer = await getCustomer();
    let option2 = `<option selected disabled>Choose One Of Customers</option>`;
    userCustomer.forEach((el) => {
      option2 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
    });
    $("select#order-create-usercustomerid").html(option2);
  } catch (error) {
    console.error(error);
  }
};
export const listUserRefSalesRead = async () => {
  try {
    // user sales
    const userSales = await getSales();
    let option1 = `<option selected disabled>Choose One Of Sales</option>`;
    userSales.forEach((el) => {
      option1 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
    });
    $("select#sales-read-personid").html(option1);
    // user customer id
    const userCustomer = await getCustomer();
    let option2 = `<option selected disabled>Choose One Of Customers</option>`;
    userCustomer.forEach((el) => {
      option2 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
    });
    $("select#sales-read-customerid").html(option2);
  } catch (error) {
    console.error(error);
  }
};
export const listUserRefSalesReadDate = async () => {
  try {
    // user sales
    const userSales = await getSales();
    let option1 = `<option selected disabled>Choose One Of Sales</option>`;
    userSales.forEach((el) => {
      option1 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
    });
    $("select#sales-read-personid-date").html(option1);
    // user customer id
    const userCustomer = await getCustomer();
    let option2 = `<option selected disabled>Choose One Of Customers</option>`;
    userCustomer.forEach((el) => {
      option2 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
    });
    $("select#sales-read-customerid-date").html(option2);
  } catch (error) {
    console.error(error);
  }
};
