import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import FrameLibraryPage from "./pages/FrameLibraryPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DisclaimerModal from "./components/common/DisclaimerModal";
import Background3D from "./components/layout/Background3D";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden font-sans flex flex-col transition-all duration-300 md:pl-20 relative">
        <Background3D />
        <Navbar />
        <DisclaimerModal />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/frames" element={<FrameLibraryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
