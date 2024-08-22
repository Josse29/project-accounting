import {
  getCustomer,
  getSales,
} from "../../../../serverless-side/functions/users.js";

export const listUserForRefOrder = () => {
  getSales((status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Sales</option>`;
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
      $("select#order-create-usersalesid").html(option);
    }
  });
  getCustomer((status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Customers</option>`;
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
      $("select#order-create-usercustomerid").html(option);
    }
  });
};
export const listUserRefSalesRead = () => {
  getSales((status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Sales</option>`;
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
      $("select#sales-read-personid").html(option);
    }
  });
  getCustomer((status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Customers</option>`;
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
      $("select#sales-read-customerid").html(option);
    }
  });
};
export const listUserRefSalesReadDate = () => {
  getSales((status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Sales</option>`;
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
      $("select#sales-read-personid-date").html(option);
    }
  });
  getCustomer((status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Customers</option>`;
      response.forEach((el) => {
        option += `<option value=${el.UserId} class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
      $("select#sales-read-customerid-date").html(option);
    }
  });
};
