const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const number = /^(?:-?(?:0\.\d+|[1-9]\d*(?:\.\d+)?)(?:[eE][-+]?\d+)?)$/;
const username = /^[a-zA-Z0-9_.]{3,15}$/;
const password = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})/;
export { email, number, username, password };
