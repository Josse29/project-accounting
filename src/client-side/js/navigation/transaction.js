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
$("#dashboardWindowTransaction")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "dashboard");
  });
$("#orderWindowTransaction")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "order");
  });
$("#inventoryWindowTransaction")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "inventory");
  });
$("#usersWindowTransaction")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "users");
  });
$("#aboutWindowTransaction")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "about");
  });
