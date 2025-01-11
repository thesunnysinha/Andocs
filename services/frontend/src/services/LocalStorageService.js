const storeToken = (value) => {
  if (value) {
    const { access, refresh } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");
  return { access_token, refresh_token };
};

const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const getAccessToken = () => {
  let access_token = localStorage.getItem("access_token");
  return access_token;
};

const getRefreshToken = () => {
  let refresh_token = localStorage.getItem("refresh_token");
  return refresh_token;
};

const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

const removeRefreshToken = () => {
  localStorage.removeItem("refresh_token");
};

const storeUserData = (value) => {
  if (value) {
    const user_data = JSON.stringify(value);
    localStorage.setItem("user_data", user_data);
  }
};

const getUserData = () => {
  let user_data = localStorage.getItem("user_data");
  return user_data;
};

const removeUserData = () => {
  localStorage.removeItem("user_data");
};

export {
  storeToken,
  getToken,
  removeToken,
  getAccessToken,
  removeAccessToken,
  getRefreshToken,
  removeRefreshToken,
  storeUserData,
  getUserData,
  removeUserData,
};
