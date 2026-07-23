import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Companions from './pages/Companions';
import Safety from './pages/Safety';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import BecomeCompanion from './pages/BecomeCompanion';
import FindCompanion from './pages/FindCompanion';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="companions" element={<Companions />} />
          <Route path="safety" element={<Safety />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="become-a-companion" element={<BecomeCompanion />} />
          <Route path="become-companion" element={<BecomeCompanion />} />
          <Route path="join" element={<BecomeCompanion />} />
          <Route path="find-a-companion" element={<FindCompanion />} />
          <Route path="match" element={<FindCompanion />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
