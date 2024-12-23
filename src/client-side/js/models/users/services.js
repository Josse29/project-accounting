import {
  deleteUserId,
  getUser,
  getUserCustomer,
  getUserPageRow,
  getUserSale,
  register,
  updateUser,
} from "../../../../serverless-side/models/user/controller.js";

// 1. endpoint : api/user/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal, 3.offsetVal,
// return : all users with search, limit, offset
const fetchLimitOffset = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getUser(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint : api/user/pagination
// method : get
// payload : 1.searchVal, 2.limitVal
// return : total page and row
const fetchRowPage = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await getUserPageRow(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/user/register
// method : POST
// payload  : 1.UserEmailVal, 2.UserFullnameVal, 3.UserPasswordVal, 4.UserPassword1Val, 5.UserImgVal, 6.UserPositionVal
// return message has been registered
const addUser = async (req) => {
  try {
    const req1 = {
      UserEmailVal: req.UserEmailVal,
      UserFullnameVal: req.UserFullnameVal,
      UserPasswordVal: req.UserPasswordVal,
      UserPassword1Val: req.UserPassword1Val,
      UserImgVal: req.UserImgVal,
      UserPositionVal: req.UserPositionVal,
    };
    const response = await register(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4.endpoint : api/user/:userid
// method : DELETE
// payload : 1.userId , 2.userFullname
// return message has been registered
const deleteById = async (req) => {
  try {
    const req1 = {
      userId: req.userId,
      userFullname: req.userFullname,
    };
    const response = await deleteUserId(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/user/:userid
// method : UPDATE
// payload : UserEmailVal, UserFullnameVal, UserPasswordVal, UserPositionVal, UserId
const update = async (req) => {
  try {
    const payLoad = {
      UserEmailVal: req.userEmail,
      UserFullnameVal: req.userFullname,
      UserImgVal: req.userImg1,
      UserPositionVal: req.userPosition,
      UserIdVal: req.userId,
      CancelImg: req.cancelImg,
    };
    const response = await updateUser(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.endpoint : api/user/list-customer
// method : GET
// payload : ""
// return : list of customer
const getListCustomer = async () => {
  try {
    const customer = await getUserCustomer();
    return { status: true, response: customer };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7.endpoint : api/user/list-sales
// method : GET
// payload : ""
// return : list of salesuser
const getListSales = async () => {
  try {
    const sales = await getUserSale();
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
export {
  addUser,
  deleteById,
  fetchLimitOffset,
  fetchRowPage,
  getListCustomer,
  getListSales,
  update,
};
