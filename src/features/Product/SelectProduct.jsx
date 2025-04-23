import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getProductListAPI } from "../../services";
import { formatCurrency1 } from "../../utils";

const SelectProduct = (props) => {
  const { className, title, setLoading, ...rest } = props;
  const [listProduct, setListProduct] = useState([]);
  const getProductList = async () => {
    try {
      setLoading(true);
      const response = await getProductListAPI();
      setListProduct(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <>
      <Select.Label title="Product" htmlFor="product" />
      <Select className={`w-full ${className} `} id="product" {...rest}>
        <Select.Option value="" title="Choose One Of Products" />
        {listProduct.length >= 1 &&
          listProduct.map((el) => (
            <Select.Option
              key={el.ProductId}
              value={el.ProductId}
              title={`${el.ProductName} - ${formatCurrency1(
                title === "buy" ? el.ProductPriceBuy : el.ProductPriceSell
              )} | Qty : ${el.TotalStockQty}`}
              data-productname={el.ProductName}
              data-productpricebuy={el.ProductPriceBuy}
              data-productpricesell={el.ProductPriceSell}
              data-fullname={el.UserFullname}
              data-email={el.UserEmail}
            />
          ))}
        {listProduct.length < 1 && (
          <Select.Option
            value=""
            title="Product is Empty"
            className="text-center italic"
          />
        )}
      </Select>
    </>
  );
};

export default SelectProduct;
