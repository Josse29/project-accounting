import { uiBtnPage, uiBtnPageActive } from "./ui.js";

const handlePagination = (totalPage) => {
  // insert button to html
  uiBtnPage(totalPage);
  // get search, limit, offset
  //   const searchVal = $("input#liability-search").val();
  //   const limitVal = $("select#liability-limit").val();
  let offsetVal = 1;
  //   1.first page
  $("button#liability-first-page")
    .off("click")
    .on("click", () => {
      // change offsetVal
      offsetVal = 1;
      // req and active page
      //   const req = {
      //     searchVal,
      //     limitVal,
      //     offsetVal,
      //   };
      //  active page
      uiBtnPageActive(offsetVal);
    });
  // 2.prevPage
  $("button#liability-prev-page")
    .off("click")
    .on("click", () => {
      let pageActive = parseInt(
        $("button.liability-page-active").text().trim()
      );
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      offsetVal = decrement;
      uiBtnPageActive(offsetVal);
    });
  // 3.by number
  $("div#liability-pagination .btn-group .btn-group button")
    .off("click", "button")
    .on("click", function () {
      const pageNumber = parseInt($(this).text().trim());
      offsetVal = pageNumber;
      uiBtnPageActive(offsetVal);
    });
  // 4 next
  $("button#liability-next-page")
    .off("click")
    .on("click", () => {
      let pageActive = parseInt(
        $("button.liability-page-active").text().trim()
      );
      console.log(pageActive);
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      offsetVal = increment;
      uiBtnPageActive(offsetVal);
    });
  // 5.last
  $("button#liability-last-page")
    .off("click")
    .on("click", () => {
      offsetVal = totalPage;
      uiBtnPageActive(offsetVal);
    });
};
export { handlePagination };
