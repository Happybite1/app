import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './App.css';

// Import always-needed sections
import Hero from './sections/Hero';
import Navigation from './sections/Navigation';

const About = lazy(() => import('./sections/About'));
const Services = lazy(() => import('./sections/Services'));
const Portfolio = lazy(() => import('./sections/Portfolio'));
const WhyChooseMe = lazy(() => import('./sections/WhyChooseMe'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: any;
    let scrollTrigger: any;
    let rafId: number;

    const init = async () => {
      const [{ default: Lenis }, gsapModule, scrollModule] = await Promise.all([
        import('@studio-freight/lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      const gsap = gsapModule.gsap;
      scrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(scrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      lenis.on('scroll', scrollTrigger.update);
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    init();

    // Page load animation
    const loadTimer = window.setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      window.clearTimeout(loadTimer);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
      if (scrollTrigger?.getAll) {
        scrollTrigger.getAll().forEach((st: any) => st.kill());
      }
    };
  }, []);

  return (
    <div 
      ref={mainRef}
      className={`relative min-h-screen bg-dark transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Suspense fallback={<div className="min-h-[320px] bg-dark" />}>
          <About />
          <Services />
          <Portfolio />
          <WhyChooseMe />
          <Contact />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Suspense fallback={<div className="h-44 bg-dark" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
