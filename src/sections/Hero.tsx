import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MessageCircle, Download, Sparkles, CheckCircle2 } from 'lucide-react';

const roles = [
  'Junior Full Stack Developer',
  'Web & System Developer',
  'PHP & Laravel Enthusiast',
  'UI/UX & Multimedia Specialist',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.1
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          0.3
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, filter: 'blur(8px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.9 },
          0.5
        );
      }

      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a');
        tl.fromTo(
          buttons,
          { scale: 0.85, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)' },
          0.7
        );
      }

      tl.fromTo(
        imageRef.current,
        { rotateX: 30, opacity: 0, scale: 0.85 },
        { rotateX: 0, opacity: 1, scale: 1, duration: 1.8 },
        0
      );

      gsap.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth typewriter for rotating roles only
  useEffect(() => {
    const currentTarget = roles[currentRoleIndex];
    let timer: number;

    if (!isDeleting) {
      if (typedRole.length < currentTarget.length) {
        timer = window.setTimeout(() => {
          setTypedRole(currentTarget.slice(0, typedRole.length + 1));
        }, 70);
      } else {
        timer = window.setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (typedRole.length > 0) {
        timer = window.setTimeout(() => {
          setTypedRole(currentTarget.slice(0, typedRole.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => window.clearTimeout(timer);
  }, [typedRole, isDeleting, currentRoleIndex]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10" />
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Animated Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-purple/20 blur-[150px] pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
            <span>Terbuka untuk Peluang Kerja & Magang (Open to Work)</span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-responsive-hero font-bold text-white mb-4 leading-tight tracking-tight"
          >
            Halo, Saya{' '}
            <span className="text-gradient">Rahmat Sito Pambudi</span>
          </h1>

          {/* Role subtitle with typewriter */}
          <div className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center mb-6">
            <p className="text-lg sm:text-2xl font-semibold text-purple-light flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple" />
              <span>{typedRole}</span>
              <span className="inline-block w-[2px] h-[1.2em] bg-purple animate-pulse" />
            </p>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Lulusan <strong className="text-white">Rekayasa Perangkat Lunak (RPL)</strong> dengan fokus pada pengembangan website modern, sistem backend berbasis <strong className="text-white">Laravel & PHP</strong>, serta keahlian desain UI dan multimedia.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, '#portfolio')}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-purple hover:bg-purple-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-glow-lg overflow-hidden"
            >
              <span className="relative z-10">Lihat Portofolio</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple to-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="/CV.pdf"
              download="CV_Rahmat_Sito_Pambudi.pdf"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-purple/10 hover:bg-purple/25 text-white font-semibold rounded-full border border-purple/40 hover:border-purple transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-glow"
            >
              <Download className="w-4 h-4 text-purple-light group-hover:scale-110 transition-transform" />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 hover:border-purple/50 transition-all duration-300 backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Saya</span>
            </a>
          </div>

          {/* Quick Highlights for HR */}
          <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full Stack & Web Dev</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Pengalaman Magang IT</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-2.5 text-xs sm:text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Siap Kerja Full-Time / Magang</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-dark to-transparent z-10" />
    </section>
  );
}

