// export const logout = () => {
//   localStorage.clear();
//   window.location.pathname = "/login";
// };

import { logoutUser } from "../../api";

export const logout = async () => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  if (userDetails && userDetails.username) {
    await logoutUser(userDetails.username);
  }
  localStorage.clear();
  window.location.pathname = "/login";
};
