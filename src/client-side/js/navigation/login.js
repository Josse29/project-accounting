$("#minimize-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("minimize-window:login-page");
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("restore-window:login-page");
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("close-window:login-page");
  });
$(".register")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("load:register-page");
  });
$("#login")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("load:dashboard-page");
  });
