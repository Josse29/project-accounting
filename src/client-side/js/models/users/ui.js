export const listUser = (el) => {
  return `<li data-id=${el.id}>${el.fullname}</li>`;
};
export const uiShowPassword = () => {
  return `<label 
            for="toggle-password"
            class="fa-solid fa-eye-slash me-2 show-password">
          </label>`;
};
export const uiHidePassword = () => {
  return `<label 
            for="toggle-password"
            class="fa-solid fa-eye me-2 hide-password">
          </label>`;
};
export const uishowConfirmPassword = () => {
  return `<label         
            for="toggle-confirm-password"
            class="fa-solid fa-eye-slash me-2 show-password">
          </label>`;
};
export const uiHidePasswordConfirm = () => {
  return `<label
            for="toggle-confirm-password"
            class="fa-solid fa-eye me-2 hide-password">
        </label>`;
};
