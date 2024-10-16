import {
  createPersediaan1,
  getPersediaan,
  getPersediaanCategoryId,
  getPersediaanDate,
  getPersediaanDateCategoryId,
  getPersediaanDateProductId,
  getPersediaanDateSupplierId,
  getPersediaanGroupProduct,
  getPersediaanPagination,
  getPersediaanPagination1,
  getPersediaanProductId2,
  getPersediaanSumPrice,
  getPersediaanSumPriceCategoryId,
  getPersediaanSumPriceDate,
  getPersediaanSumPriceDateCategoryId,
  getPersediaanSumPriceDateSupplierId,
  getPersediaanSumPriceSupplier,
  getPersediaanSumQty,
  getPersediaanSumQtyDateProductId,
  getPersediaanSupplierId,
} from "../../../../serverless-side/models/persediaan/functions.js";

// 1. endpoint : api/persediaan/group-product
// methode = GET
// payload = 1.searchVal, 2.limitVal, 3.offsetVal
// return = array persediaan by group product with search, limit, offset
export const getGroupProduct = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getPersediaanGroupProduct(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint : api/persediaan/group-product-pagination
// methode = GET
// payload = 1.searchVal, 2.limitVal
// return = only row and page by persediaan by group product
export const getRowPage1 = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await getPersediaanPagination1(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/persediaan/v-2
// methode : POST
// payload = 1.PersediaanYMDVal, 2.PersediaanHMSVal, 3.PersediaanQtyVal, 4.PersediaanTotalVal, 5. PersediaanInfoVal, 6.PersediaanProductIdVal, 7.PersediaanPersonIdVal
// return = success message after create sales
export const addStock = async (req) => {
  try {
    const payLoad = {
      PersediaanYMDVal: req.formattedDDMY,
      PersediaanHMSVal: req.formattedHMS,
      PersediaanQtyVal: req.PersediaanQtyVal,
      PersediaanTotalVal: req.PersediaanTotalVal,
      PersediaanInfoVal: req.PersediaanInfoVal,
      PersediaanProductIdVal: req.PersediaanProductIdVal,
      PersediaanPersonIdVal: req.PersediaanPersonIdVal,
    };
    const response = await createPersediaan1(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/persediaan/summary-price
// method : GET
// payload : ""
// return : summary price
export const getSumPrice = async () => {
  try {
    const sumPrice = await getPersediaanSumPrice();
    return { status: true, response: sumPrice };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint : api/persediaan/:search/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal,
// return : get all persediaan with search, limit, offset
export const getAll = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const stock = await getPersediaan(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6. endpoint : api/persediaan/pagination
//  method : GET
// payload : 1.searchVal, 2.limitVal,
// return : get pagination
export const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const pagination = await getPersediaanPagination(payLoad);
    return { status: true, response: pagination };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7. endpoint : api/persediaan/sum-qty/:productid:
// method : GET
//  payload : 1.productId
// return : sum qty by productid
export const getSumQty = async (productId) => {
  try {
    const sumQty = await getPersediaanSumQty(productId);
    return { status: true, response: sumQty };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 8. endpoint : api/persediaan/:productid
// method : GET
// payload : 1.productId
// return : get all stock based on productid
export const getByProductId2 = async (productId) => {
  try {
    const stock = await getPersediaanProductId2(productId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 9. endpoint : api/persediaan/sum-price/:supplierid
// method :GET
// payload : 1.supplierId
//  return : sum price based supplierid
export const getSumPriceSupplier = async (supplierId) => {
  try {
    const price = await getPersediaanSumPriceSupplier(supplierId);
    return { status: true, response: price };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 10. endpoint : api/persediaan/:supplierid
// method : GET
// payload : 1.supplierid
// return : all persediaan by supplierid
export const getBySupplierId = async (supplierId) => {
  try {
    const stock = await getPersediaanSupplierId(supplierId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 11. endpoint : api/persediaan/sum-price/:categoryid
// method : GET
// payload : 1.categoryid
// return : sum price based categoryid
export const getSumPriceCategoryId = async (categoryId) => {
  try {
    const price = await getPersediaanSumPriceCategoryId(categoryId);
    return { status: true, response: price };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 12. endpoint : api/persediaan/:categoryid
// method : GET
// payload : 1.categoryid
// return all persediaan based categoryid
export const getByCategoryId = async (categoryId) => {
  try {
    const stock = await getPersediaanCategoryId(categoryId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 13. endpoint : api/persediaan/sum-price/:stard-date/:end-date
// method : GET
// payload : 1.startdate, 2.endate,
// return : summary of stock by date
export const getSumPriceDate = async (req) => {
  try {
    const payLoad = {
      startDate: req.startDate,
      endDate: req.endDate,
    };
    const summary = await getPersediaanSumPriceDate(payLoad);
    return { status: true, response: summary };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 14. endpoint : api/persediaan/:start-date/:end-date
// method : GET
// payload : 1.startdate, 2.enddate
// return : all of stock by date
export const getByDate = async (req) => {
  try {
    const payLoad = {
      startDate: req.startDate,
      endDate: req.endDate,
    };
    const stock = await getPersediaanDate(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 15. endpoint : api/persediaan/sum-qty/:start-date/:end-date/:product-id
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.productid
// return : summary of price from product id
export const getSumQtyDateProduct = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      productId: req.productId,
    };
    const stock = await getPersediaanSumQtyDateProductId(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 16. endpoint : api/persediaan/:start-date/:end-date/:product-id
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.productId
//  return : get with date and productid
export const getByDateProductId = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      productId: req.productId,
    };
    const stock = await getPersediaanDateProductId(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 17. endpoint : api/persediaan/sum-price/:start-date/:end-date/:supplier-id
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.supplierId
// return : get summary with date and supplierId
export const getSumPriceDateSupplier = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      supplierId: req.supplierId,
    };
    const sumPrice = await getPersediaanSumPriceDateSupplierId(payLoad);
    return { status: true, response: sumPrice };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 18 .endpoint : api/persediaan/:start-date/:end-date/:supplierid
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.supplierId
// return : get with date and supplierId
export const getByDateSupplierId = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      supplierId: req.supplierId,
    };
    const stock = await getPersediaanDateSupplierId(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 19 .endpoint : api/persediaan/sum-price/:start-date/:end-date/:categoryid
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.categoryid
// return : get with date and categoryid
export const getSumPriceDateCategory = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      categoryId: req.categoryId,
    };
    const sumPrice = await getPersediaanSumPriceDateCategoryId(payLoad);
    return { status: true, response: sumPrice };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 20 .endpoint : api/persediaan/:start-date/:end-date/:categoryid
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.categoryid
// return : get with date and categoryid
export const getByDateCategoryId = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      categoryId: req.categoryId,
    };
    const sale = await getPersediaanDateCategoryId(payLoad);
    return { status: true, response: sale };
  } catch (error) {
    return { status: false, response: error };
  }
};
