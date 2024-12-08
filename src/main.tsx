import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import { Calculator } from "./components/Calculator.tsx";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
       <Calculator />
    </StrictMode>
);
