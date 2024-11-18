$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-apps");
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("restore-apps");
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("logout-apps");
  });
$("#dashboardWindowInventory")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "dashboard");
  });
$("#orderWindowInventory")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "order");
  });
$("#transaksiWindowInventory")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "transaksi");
  });
$("#usersWindowInventory")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "users");
  });
$("#aboutWindowInventory")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "about");
  });
