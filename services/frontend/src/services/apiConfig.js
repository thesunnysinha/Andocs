let env = "prod";
let API_BASE_URL;
let CHANNEL_URL;

if (env === "prod") {
  // Production environment
  API_BASE_URL = `https://172.105.43.160:443`;
  CHANNEL_URL = `172.105.43.160:443`;
} else {
    // Local environment
    API_BASE_URL = `http://127.0.0.1:8000`;
    CHANNEL_URL = `127.0.0.1:8000`;
}



export { API_BASE_URL, CHANNEL_URL };
