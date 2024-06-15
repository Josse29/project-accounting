$(document).ready(function () {
    let searchSupplier = $("#supplier-search-input").val();
    let limitSupplier = parseInt($("#supplier-limit").val());
    let currentPage = 1; // Initial page

    // Function to update supplier list based on page number
    function updateSupplierList(pageNumber) {
        getSupplier(searchSupplier, limitSupplier, pageNumber, (status, response) => {
            if (status) {
                let tr = '';
                response.forEach(element => {
                    tr += trSupplier(element);
                });
                $("#supplier-data").html(tr);
                updateActivePageButton(pageNumber, supplierBtnPage); // Ensure active page button
                reinitializeTooltips();
            } else {
                console.error(response);
            }
        });
    }

    // Function to update active page button
    function updateActivePageButton(pageNumber, supplierBtnPage) {
        const activePage = document.getElementsByClassName("supplier-active-page");
        if (activePage.length >= 1) {
            activePage[0].classList.remove("supplier-active-page");
        }
        supplierBtnPage[pageNumber - 1].classList.add("supplier-active-page");
    }

    // Function to handle page navigation
    function handlePageNavigation(pageNumber) {
        updateSupplierList(pageNumber);
    }

    // Function to initialize pagination
    function initializePagination(response) {
        let uiBtnPaginate = '';
        for (let i = 1; i <= response; i++) {
            uiBtnPaginate += btnSupplierPage(i);
        }
        $("#supplier-number-page").html(uiBtnPaginate);

        const supplierBtnPage = document.getElementsByClassName("supplier-btn-page");

        // Event listeners for pagination buttons
        $("#supplier-first-page").on("click", () => handlePageNavigation(1));
        $("#supplier-prev-page").on("click", () => {
            let pageActive = parseInt($(".supplier-active-page").text().trim());
            let decrementPage = pageActive - 1;
            if (decrementPage < 1) {
                decrementPage = 1;
            }
            handlePageNavigation(decrementPage);
        });
        for (let i = 0; i < response; i++) {
            supplierBtnPage[i].addEventListener("click", function () {
                const pageNumber = parseInt(this.textContent.trim());
                handlePageNavigation(pageNumber);
            });
        }
        $("#supplier-next-page").on("click", () => {
            let pageActive = parseInt($(".supplier-active-page").text().trim());
            let incrementPage = pageActive + 1;
            if (incrementPage > response) {
                incrementPage = response;
            }
            handlePageNavigation(incrementPage);
        });
        $("#supplier-last-page").on("click", () => handlePageNavigation(response));

        // Initial page load
        updateSupplierList(currentPage);
    }

    // Function to handle search based on supplier
    function getSupplierSearch() {
        searchSupplier = $("#supplier-search-input").val();
        currentPage = 1; // Reset page to 1 on search
        getSupplierAgain(); // Re-fetch suppliers based on search
    }

    // Function to handle limit change
    $("#supplier-limit").on('change', () => {
        limitSupplier = parseInt($("#supplier-limit").val());
        currentPage = 1; // Reset page to 1 on limit change
        getSupplierAgain(); // Re-fetch suppliers based on new limit
    });

    // Initial fetch and setup
    function getSupplierAgain() {
        getTotalRowSupplier(searchSupplier, (status, response) => {
            if (status) {
                $("#totalAllSupplier").html(response);
                if (response >= 1) {
                    getListSupplier((status, response) => {
                        if (status) {
                            let option = '';
                            response.forEach(element => {
                                option += `<option value="${element.SupplierId}" class="text-capitalize">${element.SupplierName}</option>`;
                            });
                            $("#inventory-refsupplier-create-name").html(option);
                        } else {
                            console.error(response);
                        }
                    });

                    getTotalPageSupplier(limitSupplier, searchSupplier, (status, response) => {
                        if (status) {
                            initializePagination(response);
                            $("#supplier-pagination").removeClass("d-none");
                        } else {
                            console.error(response);
                        }
                    });
                } else {
                    $("#supplier-data").html(trSupplierZero());
                    $("#supplier-pagination").addClass("d-none");
                }
            } else {
                console.error(response);
            }
        });
    }

    // Search functionality
    $("#supplier-search-input").on("keyup", getSupplierSearch);
    $("#supplier-search-btn").on("click", getSupplierSearch);

    // Initial load
    getSupplierAgain();
});
