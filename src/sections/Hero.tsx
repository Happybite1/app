import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MessageCircle, Download } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [typedHeadline, setTypedHeadline] = useState('');
  const [typedDesc, setTypedDesc] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          0.2
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, filter: 'blur(10px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 1 },
          0.6
        );
      }

      // CTA buttons elastic scale
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a');
        tl.fromTo(
          buttons,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
          0.8
        );
      }

      // Background image 3D rotation
      tl.fromTo(
        imageRef.current,
        { rotateX: 45, opacity: 0, scale: 0.8 },
        { rotateX: 0, opacity: 1, scale: 1, duration: 2 },
        0
      );

      // Glow pulse animation
      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax on scroll
      gsap.to(headlineRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(imageRef.current, {
        rotateX: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const text = "I'm Rahmat Sito Pambudi";
    let idx = 0;
    let isDeleting = false;
    let timeoutId: number;

    const tick = () => {
      if (!isDeleting) {
        idx += 1;
        setTypedHeadline(text.slice(0, idx));
        if (idx === text.length) {
          timeoutId = window.setTimeout(() => {
            isDeleting = true;
            tick();
          }, 1200);
          return;
        }
      } else {
        idx -= 1;
        setTypedHeadline(text.slice(0, idx));
        if (idx === 0) {
          isDeleting = false;
        }
      }
      timeoutId = window.setTimeout(tick, isDeleting ? 40 : 80);
    };

    tick();

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const text = 'Full Stack Developer | Graphic Designer | Video Editor';
    let idx = 0;
    let isDeleting = false;
    let timeoutId: number;

    const tick = () => {
      if (!isDeleting) {
        idx += 1;
        setTypedDesc(text.slice(0, idx));
        if (idx === text.length) {
          timeoutId = window.setTimeout(() => {
            isDeleting = true;
            tick();
          }, 1200);
          return;
        }
      } else {
        idx -= 1;
        setTypedDesc(text.slice(0, idx));
        if (idx === 0) {
          isDeleting = false;
        }
      }
      timeoutId = window.setTimeout(tick, isDeleting ? 40 : 80);
    };

    tick();

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background Image with 3D effect */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/30 to-dark z-10" />
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-60"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Animated Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple/20 blur-[150px] pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-responsive-hero font-bold text-white mb-1 leading-tight"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="inline-block whitespace-pre-wrap">
              {typedHeadline}
              <span className="inline-block w-[1px] h-[1.1em] ml-1 bg-white animate-pulse" />
            </span>
          </h1>

          {/* Description */}
          <p    
            ref={descRef}
            className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8 font-bold"
          >
            <span className="inline-block">
              {typedDesc}
              <span className="inline-block w-[1px] h-[1.1em] ml-2 bg-white animate-pulse" />
            </span>
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, '#portfolio')}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-purple hover:bg-purple-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-glow-lg overflow-hidden"
            >
              <span className="relative z-10">Lihat Portofolio</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple to-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="/CV.pdf"
              download="CV.pdf"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-red-600 text-red-500 hover:text-white font-semibold rounded-full border border-red-500 hover:border-red-400 transition-all duration-300"
            >
              <Download className="w-5 h-5 text-red-500 group-hover:text-white" />
              <span>Download CV</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 hover:border-purple/50 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hubungi Saya</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />
    </section>
  );
}
