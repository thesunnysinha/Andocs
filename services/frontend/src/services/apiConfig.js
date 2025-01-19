let env = "prod"; // docker, dev
let API_BASE_URL;
let CHANNEL_URL;

if (env === "prod") {
  // Production environment
  API_BASE_URL = `https://andocs.sunnysinha.space`;
  CHANNEL_URL = `andocs.sunnysinha.space`;
} else {
    // Local environment
    API_BASE_URL = `https://localhost`;
    CHANNEL_URL = `localhost`;
}



export { API_BASE_URL, CHANNEL_URL };
