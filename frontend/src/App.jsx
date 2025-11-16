import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TechnicalClubs from "./pages/TechnicalClubs";
import NonTechnicalClubs from "./pages/NonTechnicalClubs";

// Non-Technical Club Pages
import Dhwani from "./pages/Dhwani";
import Literayllis from "./pages/Literayllis";
import Nati from "./pages/Nati";
import BhangraRegiment from "./pages/BhangraRegiment";
import GiddhaSquad from "./pages/GiddhaSquad";
import Natraj from "./pages/NatrajClub";

// Technical Club Pages
import CodingNinjas from "./pages/CodingNinjas";
import IEEE from "./pages/IEEE";
import GFG from "./pages/GFG";
import ACM from "./pages/ACM";
import OpenSource from "./pages/OpenSource";
import BitsNBytes from "./pages/BitsNBytes";
import GDSC from "./pages/GDSC";
import CodingBlocks from "./pages/CodingBlocks";


export default function App() {
  return (
    <BrowserRouter>
      {/* We removed the global ParticlesBg here */}
      <div className="relative z-10 min-h-screen">
        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/technical-clubs" element={<TechnicalClubs />} />
          <Route path="/nontechnical-clubs" element={<NonTechnicalClubs />} />

          {/* Non-Technical Club Routes */}
          <Route path="/club/dhwani" element={<Dhwani />} />
          <Route path="/club/literayllis" element={<Literayllis />} />
          <Route path="/club/nati" element={<Nati />} />
          <Route path="/club/bhangra-regiment" element={<BhangraRegiment />} />
          <Route path="/club/giddha-squad" element={<GiddhaSquad />} />
          <Route path="/club/natraj" element={<Natraj />} />

          {/* Technical Club Routes */}
          <Route path="/club/coding-ninjas" element={<CodingNinjas />} />
          <Route path="/club/ieee" element={<IEEE />} />
          <Route path="/club/gfg" element={<GFG />} />
          <Route path="/club/acm" element={<ACM />} />
          <Route path="/club/open-source" element={<OpenSource />} />
          <Route path="/club/bits-n-bytes" element={<BitsNBytes />} />
          <Route path="/club/gdsc" element={<GDSC />} />
          <Route path="/club/coding-blocks" element={<CodingBlocks />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}