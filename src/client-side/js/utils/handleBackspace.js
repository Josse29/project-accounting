const handleBackspace = (event, input) => {
  if (event.key === "Backspace") {
    let value = input.val().replace("%", "");
    if (value.length > 0) {
      input.val(value.slice(0, -1) + "%");
    }
    event.preventDefault();
  }
};
export default handleBackspace;
