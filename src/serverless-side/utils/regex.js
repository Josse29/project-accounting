export const validateEmail = (val) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmail = emailRegex.test(val);
  if (!isEmail) {
    const msg = `Please input correct email `;
    throw new Error(msg);
  }
};
