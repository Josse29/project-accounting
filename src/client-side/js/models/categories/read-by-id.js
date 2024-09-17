import { getProductCategoryId } from "../../../../serverless-side/functions/product.js";

$(document).ready(function () {
  $(document)
    .off("click", "#categoryDetailBtn")
    .on("click", "#categoryDetailBtn", async function () {
      try {
        const category = this.dataset;
        const categoryId = parseInt(category.categoryid);
        const categoryName = category.categorynama;
        const categoryInfo = category.categoryketerangan;
        $("#category-detail-label").text(categoryName);
        $("#category-detail-name").text(categoryName);
        if (categoryInfo !== "") {
          $("#category-detail-info").text(categoryInfo);
        }
        if (categoryInfo === "") {
          $("#category-detail-info").text("-");
        }
        // list product
        const listProduct = await getProductCategoryId(categoryId);
        const existedProduct = listProduct.length >= 1;
        if (existedProduct) {
          let list = `<ul>`;
          listProduct.forEach((el) => {
            list += `<li class='fs-5'>${el.ProductName}</li>`;
          });
          list += `</ul>`;
          $("div#category-detail-productlistid").html(list);
        }
        if (!existedProduct) {
          const html = `<p class="fs-5 text-muted fst-italic">product no available</p>`;
          $("div#category-detail-productlistid").html(html);
        }
      } catch (error) {
        console.error(error);
      }
    });
});
