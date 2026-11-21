import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Companions from './pages/Companions';
import Safety from './pages/Safety';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import BecomeCompanion from './pages/BecomeCompanion';
import FindCompanion from './pages/FindCompanion';
import Blog from './pages/Blog';
import WhoWeSupportDetail from './pages/WhoWeSupportDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Recovery from './pages/Recovery';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="companions" element={<Companions />} />
          <Route path="who-we-support/:slug" element={<WhoWeSupportDetail />} />
          <Route path="safety" element={<Safety />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="become-a-companion" element={<BecomeCompanion />} />
          <Route path="become-companion" element={<BecomeCompanion />} />
          <Route path="join" element={<BecomeCompanion />} />
          <Route path="find-a-companion" element={<FindCompanion />} />
          <Route path="match" element={<FindCompanion />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="recovery" element={<Navigate to="/#recovery" replace />} />
          <Route path="post-op-recovery" element={<Navigate to="/#recovery" replace />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
