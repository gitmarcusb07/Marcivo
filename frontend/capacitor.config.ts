import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.marcus.marcivo",
  appName: "Marcivo",
  webDir: "dist",
  server: {
    // Allow the WebView to reach the laptop backend over LAN HTTP.
    cleartext: true,
  },
  android: {
    // Serve the bundled app as http://localhost instead of https://localhost.
    // Otherwise Chromium blocks our http://<laptop-ip>:3001 API calls as
    // mixed content (phone Chrome works because the page itself is http).
    androidScheme: "http",
  },
};

export default config;
