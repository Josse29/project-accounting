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
    ipcRenderer.send("quit-apps");
  });
$("button#login")
  .off("click")
  .on("click", () => {
    ipcRenderer.send("navigate", "dashboard");
  });
