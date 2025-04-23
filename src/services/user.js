// 1. endpoint : api/user/:limit/:offset (GET)
const getUserAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await window.ElectronAPI.User.get(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 2. endpoint : api/user/pagination (GET)
const getUserPaginationAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await window.ElectronAPI.User.pagination(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 3. endpoint : api/user-register (POST)
const registerAPI = async (req) => {
  try {
    const data = {
      UserEmailVal: req.UserEmailVal,
      UserFullnameVal: req.UserFullnameVal,
      UserPasswordVal: req.UserPasswordVal,
      UserPassword1Val: req.UserPassword1Val,
      UserImgVal: req.UserImgVal,
      UserPositionVal: req.UserPositionVal,
      UserInfoVal: req.UserInfoVal,
    };
    const response = await window.ElectronAPI.User.register(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 4.endpoint : api/user/:userid (DELETE)
const deleteUserAPI = async (req) => {
  try {
    const req1 = {
      UserId: req.UserId,
      UserFullname: req.UserFullname,
    };
    const response = await window.ElectronAPI.User.delete(req1);
    return response;
  } catch (error) {
    throw error;
  }
};
// 5.endpoint : api/user/:userid (PUT)
const updateUserAPI = async (req) => {
  try {
    const data = {
      UserEmailVal: req.UserEmailVal,
      UserFullnameVal: req.UserFullnameVal,
      UserImgVal: req.UserImgVal,
      UserPositionVal: req.UserPositionVal,
      UserIdVal: req.UserIdVal,
    };
    const response = await window.ElectronAPI.User.update(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 6.endpoint : api/user-supplier (GET)
const getSupplierAPI = async () => {
  try {
    const supplier = await window.ElectronAPI.User.supplier();
    return supplier;
  } catch (error) {
    throw error;
  }
};
// 7. endpoint : api/user-investor (GET)
const getInvestorAPI = async () => {
  try {
    const response = await window.ElectronAPI.User.investor();
    return response;
  } catch (error) {
    throw error;
  }
};
// 8. endpoint : api/user-list (GET)
const getUserListAPI = async () => {
  try {
    const response = await window.ElectronAPI.User.list();
    return response;
  } catch (error) {
    throw error;
  }
};
// 9. endpoint : api/user-sale (GET)
const getSaleAPI = async () => {
  try {
    const response = await window.ElectronAPI.User.sale();
    return response;
  } catch (error) {
    throw error;
  }
};
// 10. endpoint : api/user-customer (GET)
const getCustomerAPI = async () => {
  try {
    const response = await window.ElectronAPI.User.customer();
    return response;
  } catch (error) {
    throw error;
  }
};
// 11. endpoint : api/user-creditor (GET)
const getCreditorAPI = async () => {
  try {
    const response = await window.ElectronAPI.User.creditor();
    return response;
  } catch (error) {
    throw error;
  }
};
// 11. endpoint : api/user-receivable (GET)
const getReceivableAPI = async () => {
  try {
    const response = await window.ElectronAPI.User.receivable();
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  deleteUserAPI,
  getCustomerAPI,
  getCreditorAPI,
  getInvestorAPI,
  getUserAPI,
  getUserListAPI,
  getReceivableAPI,
  getSaleAPI,
  getSupplierAPI,
  getUserPaginationAPI,
  registerAPI,
  updateUserAPI,
};
