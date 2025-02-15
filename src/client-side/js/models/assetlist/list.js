import { formatRupiah2 } from "../../utils/formatPrice.js";
import { getAssetNameListAPI } from "./services.js";

const listAsset = async () => {
  const { status, response } = await getAssetNameListAPI();
  if (status) {
    let option = ``;
    const existed = response.length >= 1;
    if (existed) {
      option += `<option selected disabled>Choose One Of Assets</option>`;
      response.forEach((rows) => {
        const assetId = rows.AssetId;
        const assetName = rows.AssetName;
        const assetPrice = rows.AssetPrice;
        option += `
        <option
            value="${assetId}"
            data-assetname="${assetName}"
            data-assetprice="${assetPrice}">
        ${assetName} - ${formatRupiah2(assetPrice)} 
        </option>
      `;
      });
    } else {
      option += `
      <option class="text-muted fst-italic text-center" disabled selected>Asset is empty....</option>
      `;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
export { listAsset };
