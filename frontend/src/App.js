import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import { ChatSupportWidget } from "@/components/chat/ChatSupportWidget";

// 👇 ADDED: Import the new background component
import { GlobalBackground } from "@/components/layout/GlobalBackground";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Specialities from "@/pages/Specialities";
import Staffing from "@/pages/Staffing";
import Team from "@/pages/Team";
import OpenRoles from "@/pages/OpenRoles";
import CaseStudies from "@/pages/CaseStudies";
import Testimonials from "@/pages/Testimonials";
import Locations from "@/pages/Locations";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Impressum from "@/pages/Impressum";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/specialities" element={<Specialities />} />
        <Route path="/staffing" element={<Staffing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/open-roles" element={<OpenRoles />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Redirect old/merged routes */}
        <Route path="/industries" element={<Navigate to="/specialities" replace />} />
        <Route path="/innovation" element={<Navigate to="/specialities" replace />} />
        <Route path="/services" element={<Navigate to="/specialities" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          {/* 👇 ADDED: The Global Background wraps your Layout */}
          <GlobalBackground>
            <Layout>
              <AnimatedRoutes />
            </Layout>
            <ChatSupportWidget />
            <Toaster position="bottom-right" richColors />
          </GlobalBackground>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
