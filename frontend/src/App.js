import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import Staffing from "@/pages/Staffing";
import Innovation from "@/pages/Innovation";
import Leadership from "@/pages/Leadership";
import Team from "@/pages/Team";
import OpenRoles from "@/pages/OpenRoles";
import CaseStudies from "@/pages/CaseStudies";
import Testimonials from "@/pages/Testimonials";
import Locations from "@/pages/Locations";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/staffing" element={<Staffing />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/team" element={<Team />} />
        <Route path="/open-roles" element={<OpenRoles />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
