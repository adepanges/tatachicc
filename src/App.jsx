// App.js
import { Routes, Route } from "react-router-dom";
import LinktreePage from "./components/LinktreePage";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LinktreePage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
