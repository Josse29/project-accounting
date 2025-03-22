$(() => {
  const ui = `
      <h2 class="ms-3">Accounting Software</h2>
      <div class="d-flex gap-2">
        <div class="d-flex me-4">
          <i class="fa-solid fa-user custome-me"></i>
          <h5>Josse Surya Pinem</h5>
        </div>
        <div class="d-flex gap-2">
          <!--minimize  -->
          <i
            id="minimize"
            class="fa-solid fa-minus text-white custome-me tooltip-bottom-container"
            onClick="window.ElectronAPI.minimize();"
          >
            <p class="tooltip-bottom-text fs-5 p-2">Minimize</p>
          </i>
          <!-- restore window -->
          <i
            class="fa-regular fa-window-restore custome-me tooltip-bottom-container"
            id="restore"
            onClick="window.ElectronAPI.restore();"
          >
            <p class="tooltip-bottom-text fs-5 p-2">Restore</p>
          </i>
          <!-- close -->
          <i
            class="fa-solid fa-right-from-bracket custome-me tooltip-bottom-container"
            id="logout"
            onClick="window.ElectronAPI.logout();"
          >
            <p class="tooltip-bottom-text fs-5 p-2">Close</p>
          </i>
        </div>
      </div>
  `;
  $("div.top-navigation").html(ui);
});
