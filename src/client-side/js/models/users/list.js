import {
  getListCreditor,
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
    let option = `<option selected disabled>Choose One Of Sales</option>`;
    if (existed) {
      response.forEach((el) => {
        const userId = el.UserId;
        const userFullname = el.UserFullname;
        option += `<option value="${userId}" class="text-capitalize">${userFullname}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Sales Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
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
        const userId = el.UserId;
        const userFullname = el.UserFullname;
        option += `<option value="${userId}" class="text-capitalize">${userFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option selected disabled class="fst-italic text-center">Customers Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const listSupplier = async () => {
  const { status, response } = await getListSupplier();
  if (status) {
    const existed1 = response.length >= 1;
    let option = ``;
    if (existed1) {
      option += `<option value="null" selected>Choose One Of Supplier</option>`;
      response.forEach((el) => {
        const userId = el.UserId;
        const userFullname = el.UserFullname;
        option += `
        <option value="${userId}" class="text-capitalize">${userFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `
      <option disabled class="fst-italic text-center">Supplier Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const listSupplier1 = async (selectedId) => {
  const { status, response } = await getListSupplier();
  if (status) {
    const existed1 = response.length >= 1;
    let option = ``;
    if (existed1) {
      option += `<option value="null" selected>Choose One Of Supplier</option>`;
      response.forEach((el) => {
        const userId = parseInt(el.UserId);
        const userFullname = el.UserFullname;
        const selected = userId === selectedId ? "selected" : "";
        option += `
        <option value="${userId}" class="text-capitalize" ${selected}>${userFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `
      <option disabled class="fst-italic text-center">Supplier Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const listSupplier2 = async () => {
  const { status, response } = await getListSupplier();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Suppliers</option>`;
    if (existed1) {
      response.forEach((el) => {
        option += `<option value="${el.UserId}" class="text-capitalize">${el.UserFullname}</option>`;
      });
    }
    if (!existed1) {
      option += `<option disabled class="fst-italic text-center">Supplier Empty...</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const listInvestor = async () => {
  const { status, response } = await getListInvestor();
  if (status) {
    const existed1 = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Investor</option>`;
    if (existed1) {
      response.forEach((el) => {
        const userId = el.UserId;
        const userNFullname = el.UserFullname;
        option += `
        <option value="${userId}" class="text-capitalize">${userNFullname}</option>`;
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
const listCreditor = async () => {
  const { status, response } = await getListCreditor();
  if (status) {
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option += `<option selected disabled>Choose One Of Creditors</option>`;
      response.forEach((el) => {
        const userId = el.UserId;
        const userFullname = el.UserFullname;
        option += `
        <option
        value="${userId}" 
        class="text-capitalize">
          ${userFullname}
        </option>`;
      });
    }
    if (!existed) {
      option += `<option selected disabled class="text-muted text-center">creditor is empty....</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};

const listUserRefSalesCreate = async () => {
  const sales = await listSales();
  $("select#order-create-usersalesid").html(sales);
  const customer = await listCustomer();
  $("select#order-create-usercustomerid").html(customer);
};
const listUserRefSalesRead = async () => {
  const sales = await listSales();
  $("select#sales-read-personid").html(sales);
  const customer = await listCustomer();
  $("select#sales-read-customerid").html(customer);
};
const listUserRefSalesReadDate = async () => {
  const sales = await listSales();
  $("select#sales-read-personid-date").html(sales);
  const customer = await listCustomer();
  $("select#sales-read-customerid-date").html(customer);
};
const listUserRefProductCreate = async () => {
  const supplier = await listSupplier();
  $("select#product-refsupplier-create").html(supplier);
};
const listUserRefPersediaanRead = async () => {
  const supplier = await listSupplier2();
  $("select#persediaan-refsupplier-search").html(supplier);
};
const listUserRefProductUpdate = async (selectedId) => {
  const supplier = await listSupplier1(selectedId);
  $("select#product-refsupplier-update").html(supplier);
};
const listUserRefAssetCreate = async () => {
  const supplierList = await listSupplier();
  $("select#asset-userid").html(supplierList);
};
const listUserRefAssetUpdate = async (selected) => {
  const supplierList = await listSupplier1(selected);
  $("select#asset-update-userid").html(supplierList);
};
const listUserRefExpenseCreate = async () => {
  const supplierList = await listSupplier();
  $("select#expense-user-id").html(supplierList);
};
const listUserRefExpenseUpdate = async (selected) => {
  const supplierList = await listSupplier1(selected);
  $("select#expense-update-user-id").html(supplierList);
};
export {
  listInvestor,
  listCreditor,
  listCustomer,
  listSales,
  listUserRefAssetCreate,
  listUserRefAssetUpdate,
  listUserRefExpenseCreate,
  listUserRefExpenseUpdate,
  listUserRefPersediaanRead,
  listUserRefProductCreate,
  listUserRefProductUpdate,
  listUserRefSalesCreate,
  listUserRefSalesRead,
  listUserRefSalesReadDate,
};
