import React, { useEffect, useState } from "react";
import { Select } from "../../components";
import { getAssetAPI } from "../../services";
import { formatCurrency1 } from "../../utils";

const SelectAsset = (props) => {
  const { className, setLoading, ...rest } = props;
  const [asset, setAsset] = useState([]);
  const getAsset = async () => {
    try {
      setLoading(true);
      const response = await getAssetAPI();
      setAsset(response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAsset();
  }, []);
  return (
    <>
      <Select.Label title="Asset Name :" htmlFor="asset" />
      <Select className={`w-full ${className}`} id="asset" {...rest}>
        <Select.Option value="" title="Choose One Of Assets" />
        {asset.length >= 1 &&
          asset.map((el, i) => (
            <Select.Option
              key={i}
              value={el.AccountingName}
              title={`${el.AccountingName} : ${formatCurrency1(
                el.AssetBalance
              )}`}
              data-price={el.AssetBalance}
              data-type={el.AccountingRef}
            />
          ))}
        {asset.length < 1 && (
          <Select.Option
            value=""
            title="No Assets Available"
            className="text-center"
          />
        )}
      </Select>
    </>
  );
};

export default SelectAsset;
