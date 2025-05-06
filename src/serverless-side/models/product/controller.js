import {
  queryDeleteProductId,
  queryGetProductCSV,
  queryGetProduct,
  queryGetProductListRefStock,
  queryGetProductListRefSale,
  queryGetProductPDF,
  queryGetProductRefStock,
  queryGetProductTotalRow,
  queryGetProductTotalRow1,
  queryInsertProduct,
  queryUpdateProduct,
} from "./querysql.js";
import {
  validateAccounting,
  validateExisted,
  validateLoadImg,
  validateLoadImg1,
  validatePrice,
  validateProductName,
} from "../../utils/validation.js";
import { capitalizeWord } from "../../utils/formatTxt.js";
import {
  executeCreate,
  executeDelete,
  executeGet,
  executeGet1,
  executeUpdate,
} from "../../database/runQuery.js";
import productSchema from "./schema.js";

const Product = (ipcMain, db) => {
  // init db product
  const initProduct = async () => {
    await executeCreate(db, productSchema);
  };
  initProduct();
  // 1.CREATE
  ipcMain.handle("createProduct", async (_, req) => {
    const {
      productName,
      productPriceBuy,
      productPriceSell,
      productInfo,
      productSupplierId,
      productImg,
    } = req;
    // 1 validation
    validateProductName(productName);
    validatePrice(productPriceBuy, productPriceSell);
    const imgBase64 = await validateLoadImg1(productImg);
    // 2.query
    const query = queryInsertProduct(
      capitalizeWord(productName),
      parseFloat(productPriceBuy),
      parseFloat(productPriceSell),
      productInfo,
      parseInt(productSupplierId) || null,
      imgBase64
    );
    await executeCreate(db, query);
    const msg = `Product - ${capitalizeWord(productName)} has been added `;
    return msg;
  });
  // 2.READ
  ipcMain.handle("getProduct", async (_, req) => {
    const { searchVal, limitVal, offsetVal } = req;
    const limitVal1 = parseInt(limitVal);
    const offsetVal1 = parseInt(offsetVal);
    const startOffset = (offsetVal1 - 1) * limitVal1;
    const queryProduct = queryGetProduct(searchVal, limitVal1, startOffset);
    const products = await executeGet(db, queryProduct);
    return products;
  });
  ipcMain.handle("paginationProduct", async (_, req) => {
    const { searchVal, limitVal } = req;
    const query = queryGetProductTotalRow(searchVal);
    const totalPageRow = await executeGet1(db, query, limitVal);
    return totalPageRow;
  });
  ipcMain.handle("getProductStock", async (_, req) => {
    const { searchVal, limitVal, offsetVal } = req;
    const startOffset = (offsetVal - 1) * limitVal;
    const query = queryGetProductRefStock(searchVal, limitVal, startOffset);
    const products = await executeGet(db, query);
    return products;
  });
  ipcMain.handle("paginationProduct1", async (_, req) => {
    const { searchVal, limitVal } = req;
    const query = queryGetProductTotalRow1(searchVal);
    const totalPageRow = await executeGet1(db, query, limitVal);
    return totalPageRow;
  });
  ipcMain.handle("getProductList", async () => {
    const query = queryGetProductListRefStock();
    const product = await executeGet(db, query);
    return product;
  });
  const getProductListRefSale = async () => {
    const query = queryGetProductListRefSale();
    const product = await window.ElectronAPI.sqlite3.all(query);
    return product;
  };
  ipcMain.handle("getProductCSV", async () => {
    const query = queryGetProductCSV();
    const product = await executeGet(db, query);
    validateExisted(product, "Product");
    return product;
  });
  ipcMain.handle("getProductPDF", async () => {
    const query = queryGetProductPDF();
    const product = await executeGet(db, query);
    validateExisted(product, "Product");
    return product;
  });
  // 3.UPDATE
  ipcMain.handle("updateProduct", async (_, req) => {
    const {
      productId,
      productName,
      productPriceBuy,
      productPriceSell,
      productSupplierId,
      productInfo,
      productImgVal,
    } = req;
    await validateAccounting(db);
    // 1.validate name
    validateProductName(productName);
    validatePrice(productPriceBuy, productPriceSell);
    const imgBase64 = await validateLoadImg1(productImgVal);
    // execute
    const query = queryUpdateProduct(
      productId,
      capitalizeWord(productName),
      productPriceBuy,
      productPriceSell,
      parseInt(productSupplierId) || null,
      productInfo,
      imgBase64
    );
    await executeUpdate(db, query);
    const msg = `Product ${productName} has been updated`;
    return msg;
  });
  // 4.DELETE
  ipcMain.handle("deleteProduct", async (_, req) => {
    const { productid, productName } = req;
    await validateAccounting(db);
    const query = queryDeleteProductId(productid);
    await executeDelete(db, query);
    const msg = `Product - ${productName} has been deleted`;
    return msg;
  });
};
export default Product;
