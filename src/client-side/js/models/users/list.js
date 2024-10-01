import {
  getCustomer,
  getSales,
} from "../../../../serverless-side/functions/users.js";

export const listUserRefSalesCreate = async () => {
  try {
    // for user sales
    const userSales = await getSales();
    const existed = userSales.length >= 1;
    let option1 = `<option selected disabled>Choose One Of Sales</option>`;
    if (existed) {
      userSales.forEach((el) => {
        option1 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    } else {
      option1 += `<option class="text-capitalize p-0 fst-italic text-center" disabled>Sales Empty............</option>`;
    }
    $("select#order-create-usersalesid").html(option1);
    // for user customer
    const userCustomer = await getCustomer();
    const existed1 = userCustomer.length >= 1;
    let option2 = `<option selected disabled>Choose One Of Customers</option>`;
    if (existed1) {
      userCustomer.forEach((el) => {
        option2 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    } else {
      option2 += `<option class="text-capitalize p-0 fst-italic text-center" disabled>Customer Empty............</option>`;
    }
    $("select#order-create-usercustomerid").html(option2);
  } catch (error) {
    console.error(error);
  }
};
export const listUserRefSalesRead = async () => {
  try {
    // user sales
    const userSales = await getSales();
    const existed = userSales.length >= 1;
    let option1 = `<option selected disabled >Choose One Of Sales</option>`;
    if (existed) {
      userSales.forEach((el) => {
        option1 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed) {
      option1 += `<option disabled class="fst-italic text-center">Sales Empty...</option>`;
    }
    $("select#sales-read-personid").html(option1);
    // user customer id
    const userCustomer = await getCustomer();
    const existed1 = userCustomer.length >= 1;
    let option2 = `<option selected disabled>Choose One Of Customers</option>`;
    if (existed1) {
      userCustomer.forEach((el) => {
        option2 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option2 += `<option disabled class="fst-italic text-center">Customers Empty...</option>`;
    }
    $("select#sales-read-customerid").html(option2);
  } catch (error) {
    console.error(error);
  }
};
export const listUserRefSalesReadDate = async () => {
  try {
    // user sales
    const userSales = await getSales();
    const existed = userSales.length >= 1;
    let option1 = `<option selected disabled>Choose One Of Sales</option>`;
    if (existed) {
      userSales.forEach((el) => {
        option1 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    } else {
      option1 += `<option disabled class="fst-italic text-center">Sales Empty...</option>`;
    }
    $("select#sales-read-personid-date").html(option1);
    // user customer id
    const userCustomer = await getCustomer();
    const existed1 = userSales.length >= 1;
    let option2 = `<option selected disabled>Choose One Of Customers</option>`;
    if (existed1) {
      userCustomer.forEach((el) => {
        option2 += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    } else {
      option2 += `<option disabled class="fst-italic text-center">Sales Empty...</option>`;
    }
    $("select#sales-read-customerid-date").html(option2);
  } catch (error) {
    console.error(error);
  }
};
