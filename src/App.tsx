import Preloader from './components/Preloader';
import Seo from './components/Seo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Products from './components/Products';
import About from './components/About';
import Shipping from './components/Shipping';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import './App.css';

export default function App() {
  return (
    <>
      <Seo />
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <About />
        <Shipping />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppChatbot />
    </>
  );
}