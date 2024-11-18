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
$("#dashboardWindowOrder")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "dashboard");
  });
$("#inventoryWindowOrder")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "inventory");
  });
$("#transaksiWindowOrder")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "transaksi");
  });
$("#usersWindowOrder")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "users");
  });
$("#aboutWindowOrder")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "about");
  });
