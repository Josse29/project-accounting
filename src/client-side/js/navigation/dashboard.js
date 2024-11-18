// top
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

// side
$("#orderWindow")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "order");
  });
$("#inventoryWindow")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "inventory");
  });
$("#transaksiWindow")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "transaksi");
  });
$("#usersWindow")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "users");
  });
$("#aboutWindow")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "about");
  });
