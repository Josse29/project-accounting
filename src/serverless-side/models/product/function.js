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
  queryGetProductCategoryId,
  queryGetProductPDF,
  queryGetProductSupplierId,
  queryGetProducts,
  queryTotalRowProducts,
  queryUpdateProduct,
  queryinsertProducts,
} from "./querysql.js";

// 1.CREATE
export const insertProducts = async (req) => {
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
        if (totalRow % limitVal === 0) {
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
export const getListProduct = (productSearch) => {
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
export const getProductSupplierId = (supplierId) => {
  const query = queryGetProductSupplierId(supplierId);
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
export const getProductCategoryId = (categoryId) => {
  const query = queryGetProductCategoryId(categoryId);
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
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation image
  const imgBase64 = validateLoadImg(productImgVal);
  // execute
  const query = queryUpdateProduct(
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    productCategoryId,
    productSupplierId,
    productInfo,
    imgBase64
  );
  console.log(query);
  return false;
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
export const getProductPDF = () => {
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
export const getProductCSV = () => {
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
