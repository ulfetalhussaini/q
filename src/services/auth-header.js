export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.data.token) {
    return { Authorization: 'Bearer ' + user.data.token }; // for Laravel back-end
  } else {
    return {};
  }
}
