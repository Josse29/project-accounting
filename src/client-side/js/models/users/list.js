import {
  getListCustomer,
  getListInvestor,
  getListSales,
  getListSupplier,
} from "./services.js";

const listSales = async () => {
  // user sales
  const { status, response } = await getListSales();
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled >Choose One Of Sales</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value="${el.UserId}" class="text-capitalize p-0">${el.UserFullname}</option>`;
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
        option += `<option value="${el.UserId}" class="text-capitalize p-0">${el.UserFullname}</option>`;
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
const listSupplier = async () => {
  const { status, response } = await getListSupplier();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option value="null" selected>Choose One Of Supplier</option>`;
    if (existed1) {
      response.forEach((el) => {
        option += `<option value="${el.UserId}" class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option disabled class="fst-italic text-center">Supplier Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
  }
};
const listSupplier1 = async (selectedId) => {
  const { status, response } = await getListSupplier();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option value="null" selected>Choose One Of Supplier</option>`;
    if (existed1) {
      response.forEach((el) => {
        const selected = parseInt(el.UserId) === selectedId ? "selected" : "";
        option += `<option value="${el.UserId}" class="text-capitalize p-0" ${selected}>${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option disabled class="fst-italic text-center">Supplier Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
  }
};
const listSupplier2 = async () => {
  const { status, response } = await getListSupplier();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Suppliers</option>`;
    if (existed1) {
      response.forEach((el) => {
        option += `<option value="${el.UserId}" class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option disabled class="fst-italic text-center">Supplier Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
  }
};
const listInvestor = async () => {
  const { status, response } = await getListInvestor();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Investor</option>`;
    if (existed1) {
      response.forEach((el) => {
        option += `<option value="${el.UserId}" class="text-capitalize p-0">${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option disabled class="fst-italic text-center">Investor Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
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
export const listUserRefProductCreate = async () => {
  const supplier = await listSupplier();
  $("select#product-refsupplier-create").html(supplier);
};
export const listUserRefPersediaanRead = async () => {
  const supplier = await listSupplier2();
  $("select#persediaan-refsupplier-search").html(supplier);
};
export const listUserRefProductUpdate = async (selectedId) => {
  const supplier = await listSupplier1(selectedId);
  $("select#product-refsupplier-update").html(supplier);
};
export const listUserRefAccountingCreate = async () => {
  const investor = await listInvestor();
  $("div#cashin_other_value select#investor").html(investor);
};
