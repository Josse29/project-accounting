$(document).ready(function () {
  console.log("test");
  console.log($(".card-body").length);
  $("div#product-refpersediaan-read")
    .off("click", "button#order-create-qty-plus")
    .on("click", "button#order-create-qty-plus", function () {
      console.log(this);
      // const cartArray = getStorageCart();
      // get all data
      const productId = $(this).data("productid");
      const productName = $(this).data("productname");
      const productStock = $(this).data("productstock");
      console.log(productName);
      return;
      const productPriceSell = disFormatRupiah1(
        $(this).data("productpricesell")
      );
      const productPriceBuy = disFormatRupiah1($(this).data("productpricebuy"));
      const productCard = $(`button[data-productid=${productId}]`).closest(
        ".card-body"
      );
      const btnPlus = productCard.find("button#order-create-qty-plus");
      const btnMin = productCard.find("button#order-create-qty-minus");
      // find index id
      const productIndex = cartArray.findIndex((e) => {
        return e.ProductId === productId;
      });
      // if it already exist in storage, justupdate qty++
      if (productIndex !== -1) {
        if (cartArray[productIndex].ProductQty < productStock) {
          cartArray[productIndex].ProductQty++;
          btnMin.removeClass("unsufficient");
        }
        if (cartArray[productIndex].ProductQty >= productStock) {
          btnPlus.addClass("unsufficient");
        }
      }
      // if it isn't already exist in storage, push to storage
      if (productIndex === -1) {
        const newObject = {
          ProductId: productId,
          ProductName: productName,
          ProductPriceBuy: productPriceBuy,
          ProductPriceSell: productPriceSell,
          ProductQty: 1,
        };
        // push to array
        cartArray.push(newObject);
        // sort array by name
        cartArray.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
        btnMin.removeClass("unsufficient");
      }
      // save to storage
      setStorageCart(cartArray);
      // updating ui only qty
      uiQty();
      // updating list cart
      listCart();
    });
});
