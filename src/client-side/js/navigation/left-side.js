$(async () => {
  // const currentPage = await window.electronAPI.getCurrentPage();
  const currentPage = document.title;
  const ui = `
        <div class="logo" id="dragWin">
          <img src="./../images/import.png" alt="" />
        </div>
        <!-- links -->
        <div class="text-white mt-5">
          <!-- dashboard -->
          <div
            class="text-center mb-5 custome-me tooltip-right-container"
            onClick='window.electronAPI.navigateTo("dashboard")'
          >
            <i class="fa-solid fa-house fs-3 ${
              currentPage === "Dashboard" && "custome-me-active"
            }">
              <div class="tooltip-right-text fs-4 p-2 px-3">Dashboard</div>
            </i>
          </div>
          <!-- order -->
          <div
            class="text-center mb-5 custome-me tooltip-right-container"
            onClick='window.electronAPI.navigateTo("order")'
          >
            <i class="fa-solid fa-utensils fs-3 ${
              currentPage === "Order" && "custome-me-active"
            }">
              <div class="tooltip-right-text fs-4 p-2 px-3">Order</div>
            </i>
          </div>
          <!-- inventory -->
          <div
            class="text-center mb-5 custome-me tooltip-right-container"
            onClick='window.electronAPI.navigateTo("inventory")'
          >
            <i class="fa-solid fa-file-circle-plus fs-3 ${
              currentPage === "Inventory" && "custome-me-active"
            }">
              <div class="tooltip-right-text fs-4 p-2 px-3">Inventory</div>
            </i>
          </div>
          <!-- transaksi -->
          <div
            class="text-center mb-5 custome-me tooltip-right-container"
            onClick='window.electronAPI.navigateTo("transaksi")'
          >
            <i class="fa-solid fa-chart-simple fs-3 ${
              currentPage === "Transaksi" && "custome-me-active"
            }">
              <div class="tooltip-right-text fs-4 p-2 px-3">Transaction</div>
            </i>
          </div>
          <!-- users -->
          <div
            class="text-center mb-5 custome-me tooltip-right-container"
            onClick='window.electronAPI.navigateTo("users")'>
            <i class="fa-solid fa-users fs-3 ${
              currentPage === "Users" && "custome-me-active"
            }">
              <div class="tooltip-right-text fs-4 p-2 px-3">Users</div>
            </i>
          </div>
          <!-- about -->
          <div 
            class="text-center mb-5 custome-me tooltip-right-container"
            onClick='window.electronAPI.navigateTo("about-us")'>
            <i class="fa-solid fa-city fs-3 ${
              currentPage === "About" && "custome-me-active"
            }">
              <div class="tooltip-right-text fs-4 p-2 px-3">About</div>
            </i>
          </div>
        </div>
  `;
  $(".side-navigation").html(ui);
});
