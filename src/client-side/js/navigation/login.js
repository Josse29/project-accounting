$("#minimize-window")
  .off("click")
  .on("click", () => {
    window.electronAPI.minimize();
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    window.electronAPI.restore();
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    window.electronAPI.close();
  });
$("button#login")
  .off("click")
  .on("click", () => {
    window.electronAPI.navigateTo("dashboard");
  });
