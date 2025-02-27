import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorProvider } from "./context/ColorContext";
import GlobalStyles from "./style/GlobalStyles";
import theme from "./style/theme";
import "./style/glabal.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ColorProvider>
        <App />
      </ColorProvider>
    </ThemeProvider>
  </StrictMode>
);

reportWebVitals();
