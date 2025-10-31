import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // 1. Import createRoot

import App from "./App";

const rootElement = document.getElementById("root");

// 2. Create a root attached to the rootElement
const root = createRoot(rootElement);

// 3. Call render on the new root
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);