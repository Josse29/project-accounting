$(".card-body")
  .off("click", "button#order-create-qty-minus")
  .on("click", "button#order-create-qty-minus", function () {
    // const cartArray = getStorageCart();
    // get all data
    const productId = $(this).data("productid");
    // find index id
    const productIndex = cartArray.findIndex((e) => {
      return e.ProductId === productId;
    });
    const productCard = $(`button[data-productid=${productId}]`).closest(
      ".card-body"
    );
    const btnMin = productCard.find("button#order-create-qty-minus");
    const btnPlus = productCard.find("button#order-create-qty-plus");
    const productName = btnPlus.data("productname");
    console.log(btnPlus);
    console.log(productName);
    return;
    // if it already exist in storage, justupdate qty--
    if (productIndex !== -1) {
      if (cartArray[productIndex].ProductQty > 0) {
        cartArray[productIndex].ProductQty--;
        btnPlus.removeClass("unsufficient");
      }
      if (cartArray[productIndex].ProductQty <= 0) {
        btnMin.addClass("unsufficient");
      }
      cartArray[productIndex].ProductTotal =
        cartArray[productIndex].ProductQty *
        cartArray[productIndex].ProductPrice;
    }
    // if its'not already exist in storage, justaddclass btn
    if (productIndex === -1) {
      btnPlus.removeClass("unsufficient");
      btnMin.addClass("unsufficient");
    }
    // save to storage
    setStorageCart(cartArray);
    // updating ui qty card only
    uiQty();
    // updating list cart for order temp
    listCart();
  });
