import db from "../../database/config.js";
import {
  validateLoadImg,
  validatePrice,
  validateProductName,
} from "../../utils/validation.js";
import {
  queryDeleteProductId,
  queryGetListProduct,
  queryGetProductCSV,
  queryGetProductPDF,
  queryGetProducts,
  queryTotalRowProducts,
  queryUpdateProduct,
  queryinsertProducts,
} from "./querysql.js";

// 1.CREATE
export const createProduct = async (req) => {
  const {
    productName,
    productPriceBuy,
    productPriceSell,
    productInfo,
    productCategoryId,
    productSupplierId,
    productImg,
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation and load image base64
  const imgBase64 = await validateLoadImg(productImg);
  // execute
  const query = queryinsertProducts(
    productName,
    productPriceBuy,
    productPriceSell,
    productInfo,
    productCategoryId,
    productSupplierId,
    imgBase64
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Product <b class='text-capitalize'>${productName}</b> has been added `;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 2.READ
export const getProductPagination = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowProducts(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        const isEven = totalRow % limitVal === 0;
        if (isEven) {
          totalPage = parseInt(totalRow / limitVal);
        } else {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalPage, totalRow });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getProduct = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  const query = queryGetProducts(searchVal, limitVal, startOffset);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getProductList = (productSearch) => {
  const query = queryGetListProduct(productSearch);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 3.UPDATE
export const updateProduct = async (req) => {
  const {
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    productCategoryId,
    productSupplierId,
    productInfo,
    productImgVal,
    productCancelImg,
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation image
  const imgBase64 = await validateLoadImg(productImgVal);
  // execute
  const query = queryUpdateProduct(
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    productCategoryId,
    productSupplierId,
    productInfo,
    imgBase64,
    productCancelImg
  );
  console.log(query);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Product <b class='text-capitalize'>${productName}</b> has been updated`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 4.DELETE
export const deleteProductId = (req) => {
  const { productid, productName } = req;
  return new Promise((resolve, reject) => {
    db.run(queryDeleteProductId(productid), (err) => {
      if (!err) {
        const msg = `Product <b class='text-capitalize'>${productName}</b> has been deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// convert | PDF
export const getProductReport = () => {
  const query = queryGetProductPDF();
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getProductReport1 = () => {
  const query = queryGetProductCSV();
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
