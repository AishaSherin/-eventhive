// Get JWT token from localStorage
export function getToken() {
  return localStorage.getItem("eventhive_token") || null;
}

// Get logged-in user from localStorage
export function getUser() {
  const user = localStorage.getItem("eventhive_user");

  return user ? JSON.parse(user) : null;
}

// Check whether the user is logged in
export function isLoggedIn() {
  return getToken() !== null;
}

// Check whether the user is an organiser
export function isOrganiser() {
  const user = getUser();

  return user && user.role === "organizer";
}

// Logout the user
export function logout() {
  localStorage.removeItem("eventhive_token");
  localStorage.removeItem("eventhive_user");

  window.location.href = "/login";
}