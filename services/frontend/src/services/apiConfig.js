// let env = "docker";
let API_BASE_URL;
let CHANNEL_URL;

// if (env === "prod") {
//   // Production environment
//   API_BASE_URL = `http://49.50.85.157:8000`;
//   CHANNEL_URL = `49.50.85.157:8000`;
// } else {
//   // Local environment
//   API_BASE_URL = `http://${window._env_.REACT_APP_BACKEND_HOST}:${window._env_.REACT_APP_BACKEND_PORT}`;
//   CHANNEL_URL = `${window._env_.REACT_APP_BACKEND_HOST}:${window._env_.REACT_APP_BACKEND_PORT}`;
// }

API_BASE_URL = `http://127.0.0.1:8000`;
CHANNEL_URL = `127.0.0.1:8000`;

export { API_BASE_URL, CHANNEL_URL };
