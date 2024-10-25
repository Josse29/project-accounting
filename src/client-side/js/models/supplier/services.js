import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSupplierInit,
  getSupplierList,
  updateSupplier,
} from "../../../../serverless-side/models/supplier/controller.js";
// 1.endpoint : api/supplier/
// method : POST
// payload : 1.suppliername, 2.supplierinfo, 3.supplierimg
// return : mesage success supplier create
export const create = async (req) => {
  try {
    const payLoad = {
      supplierName: req.supplierName,
      supplierInfo: req.supplierInfo,
      supplierImg: req.supplierImg,
    };
    const created = await createSupplier(payLoad);
    return { status: true, response: created };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.enpoint : api/supplier/:limit/:offset
// method : GET
// payload : 1.searchVal 2.limitVal, 3.offsetVal
// return : supplier with limit offset
export const getByLimitOffset = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const supplier = await getSupplier(payLoad);
    return { status: true, response: supplier };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/supplier/pagination
// method :GET
// payload : 1.searchVal, 2.limitVal
// return : supplier with total page with row
export const pagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const pagination = await getSupplierInit(payLoad);
    return { status: true, response: pagination };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4.endpoint : api/supplier/:supplierid
// method : PATCH
// payLoad : 1.suppliername, 2.supplierinfo, 3.supplierimg, 4.supplierimgCancel
// return : message suucces supplierupdate
export const update = async (req) => {
  try {
    const payload = {
      supplierId: req.supplierId,
      supplierName: req.supplierName,
      supplierInfo: req.supplierInfo,
      supplierImgVal: req.supplierImgVal,
      supplierCancelImg: req.supplierCancelImg,
    };
    const updated = await updateSupplier(payload);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/supplier/:supplierid
// method : DELETE
// payload : 1.supplierId, 2.supplierName
// return : message success deleted
export const deleteById = async (req) => {
  try {
    const payLoad = {
      supplierId: req.supplierId,
      supplierName: req.supplierName,
    };
    const deleted = await deleteSupplier(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.endpoint : api/supplier/list
// method : GET
// payload : 1.searchVal
// return : supplier list
export const getList = async (req) => {
  try {
    const list = await getSupplierList(req);
    return { status: true, response: list };
  } catch (error) {
    return { status: false, response: error };
  }
};
