import {
  createProduct,
  deleteProductId,
  getProduct,
  getProductListRefStock,
  getProductListRefSale,
  getProductPagination,
  getProductPagination1,
  getProductRefStock,
  getProductReport,
  getProductReport1,
  updateProduct,
} from "../../../../serverless-side/models/product/controller.js";

// 1.endpoint : api/product/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal, 3.offsetVal
// return all product with searchval, limitVal, offsetVal
const getLimitOffset = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const product = await getProduct(payLoad);
    return { status: true, response: product };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/product/pagination
// method : GET
// payload : 1.searchVal, 2.limitVal
// return pagination with searchval, limitVal
const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const pagination = await getProductPagination(payLoad);
    return { status: true, response: pagination };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint : api/product/
// method : POST
// payload : 1.productName, 2.productPriceBuy, 3.productPriceSell, 4.productInfo, 5.productCategoryId, 6.productSupplierId, 7.productImg, 8.imgBase64
// return : message success create
const addProduct = async (req) => {
  try {
    const payLoad = {
      productName: req.productName,
      productPriceBuy: req.productPriceBuy,
      productPriceSell: req.productPriceSell,
      productInfo: req.productInfo,
      productSupplierId: req.productSupplierId,
      productImg: req.productImg,
    };
    const created = await createProduct(payLoad);
    return { status: true, response: created };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/product/:productid
// method : PUT
// payload : 1.productId, 2.productName, 3.productPriceBuy, 4.productPriceSell, 5.productCategoryId, 6.productSupplierId, 7.productInfo, 8.productImgVal, 9.productCancelImg
// return : message success update
const update = async (req) => {
  try {
    const payLoad = {
      productId: req.productId,
      productName: req.productName,
      productPriceBuy: req.productPriceBuy,
      productPriceSell: req.productPriceSell,
      productSupplierId: req.productSupplierId,
      productInfo: req.productInfo,
      productImgVal: req.productImgVal,
      productCancelImg: req.productCancelImg,
    };
    const updated = await updateProduct(payLoad);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint : api/proudct/:productid
// method : DELETE
// payload : productid, productname
// return :  message success deleted
const deletedById = async (req) => {
  try {
    const payLoad = {
      productid: req.productid,
      productName: req.productName,
    };
    const deleted = await deleteProductId(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.enpoint : api/product/report-pdf
// method : GET
// payload : ""
// return : get all product
const getPDF = async () => {
  try {
    const products = await getProductReport();
    return { status: true, response: products };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7.enpoint : api/product/report-csv
// method : GET
// payload : ""
// return : get all product
const getCSV = async () => {
  try {
    const products = await getProductReport1();
    return { status: true, response: products };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 8.endpoint : api/product/list-ref-Stock
// method : GET
// payload : ""
// return : product list ref Stock
const getListRefStock = async () => {
  try {
    const list = await getProductListRefStock();
    return { status: true, response: list };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 9. endpoint : api/product/pagination-1
// methode = GET
// payload = 1.searchVal, 2.limitVal
// return = only row and page product ref Stock
const getPagination1 = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await getProductPagination1(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 10.endpoint : api/product-ref-Stock/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal, 3.offsetVal
// return all product with searchval, limitVal, offsetVal
const getLimitOffset1 = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const product = await getProductRefStock(payLoad);
    return { status: true, response: product };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 11.endpoint : api/product/list-ref-sale
// method : GET
// payload : ""
// return : product list ref Stock
const getListRefSale = async () => {
  try {
    const productList = await getProductListRefSale();
    return { status: true, response: productList };
  } catch (error) {
    return { status: false, response: error };
  }
};

export {
  addProduct,
  deletedById,
  getPDF,
  getCSV,
  getLimitOffset,
  getLimitOffset1,
  getListRefStock,
  getListRefSale,
  getPagination,
  getPagination1,
  update,
};
