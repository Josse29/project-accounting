export const uiTr = (el) => {
  const tr = `<tr>
                <td class="text-center align-content-center text-truncate pe-3">
                  ${el.UserId}
                </td>
                <td class="text-capitalize align-content-center text-truncate pe-3">
                  ${el.UserFullname}
                </td>
                <td class="align-content-center text-truncate pe-3">
                  ${el.UserEmail}
                </td>
                <td class="text-capitalize align-content-center text-truncate pe-3">
                  ${el.UserPosition}
                </td>
                <td class="align-content-center">
                  <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-success text-white">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-primary text-white">
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger text-white">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>`;
  return tr;
};
export const uiBtnPage = (i) => {
  let actived = `${i === 1 ? "page-active" : ""}`;
  const btn = `<button type="button" class="btn border border-2 fs-6 ${actived}">
                 ${i}
               </button> `;
  return btn;
};
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
