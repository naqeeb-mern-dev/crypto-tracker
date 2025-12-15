export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // convert to ms
    const now = Date.now();
    return now > exp; // true = expired
  } catch (error) {
    return true; // if decoding fails, treat as expired
  }
}
