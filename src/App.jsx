import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/onboarding/Auth";
import { ThemeProvider } from "@primer/react";
import EyeTracking from "./pages/onboarding/EyeTracking";
import AdditionalInfo from "./pages/onboarding/AdditionalInfo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/eye-tracking" element={<EyeTracking />} />
            <Route path="/more-info" element={<AdditionalInfo />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

export default App;
