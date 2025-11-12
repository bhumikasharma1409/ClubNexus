import { BrowserRouter, Routes, Route } from "react-router-dom";
import TechnicalClubs from "./pages/TechnicalClubs";
import NonTechnicalClubs from "./pages/NonTechnicalClubs";
import ParticlesBg from "./components/ParticlesBg";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white">
        <ParticlesBg />
        <div className="relative z-20">
          <Routes>
            <Route path="/" element={<TechnicalClubs />} />
            <Route path="/technical-clubs" element={<TechnicalClubs />} />
            <Route path="/nontechnical-clubs" element={<NonTechnicalClubs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
