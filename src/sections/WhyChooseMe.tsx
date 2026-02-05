import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  Target, 
  Code2, 
  MessageSquare, 
  Headphones 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Sparkles,
    title: 'Desain Modern dan Profesional',
    description: 'Tampilan yang estetis dan sesuai dengan tren desain terkini untuk memberikan kesan profesional.',
  },
  {
    icon: Target,
    title: 'Fokus Pada Kebutuhan Klien',
    description: 'Setiap proyek dimulai dengan memahami goals dan kebutuhan spesifik bisnis Anda.',
  },
  {
    icon: Code2,
    title: 'Kode Bersih dan Mudah Dikembangkan',
    description: 'Struktur kode yang rapi, terdokumentasi, dan mudah untuk maintenance di masa depan.',
  },
  {
    icon: MessageSquare,
    title: 'Komunikasi Transparan dan Tepat Waktu',
    description: 'Update progress secara berkala dan respons cepat untuk setiap pertanyaan atau permintaan.',
  },
  {
    icon: Headphones,
    title: 'Dukungan dan Maintenance Berkelanjutan',
    description: 'Layanan support pasca-launch untuk memastikan sistem berjalan optimal.',
  },
];

export default function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Cards pop in animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.reason-card');
        gsap.fromTo(
          cards,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // SVG line draw animation
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path');
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 100;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              once: true,
            },
          });
        });
      }

      // Data flow dots animation
      const dots = svgRef.current?.querySelectorAll('.flow-dot');
      if (dots) {
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            motionPath: {
              path: (dot as HTMLElement).dataset.path || '',
              align: (dot as HTMLElement).dataset.path || '',
              alignOrigin: [0.5, 0.5],
            },
            duration: 3,
            repeat: -1,
            ease: 'none',
            delay: i * 0.6,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-me"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-[200px]" />

      {/* SVG Connection Lines */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7e6ee3" stopOpacity="0" />
            <stop offset="50%" stopColor="#7e6ee3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7e6ee3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Connection lines between cards */}
        <path
          d="M 200 200 Q 400 150 600 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
        <path
          d="M 600 200 Q 800 250 1000 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
        <path
          d="M 400 400 Q 600 350 800 400"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
        <path
          d="M 200 400 Q 400 450 600 400"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
        
        {/* Flow dots */}
        <circle className="flow-dot" r="4" fill="#7e6ee3" data-path="M 200 200 Q 400 150 600 200" />
        <circle className="flow-dot" r="4" fill="#7e6ee3" data-path="M 600 200 Q 800 250 1000 200" />
        <circle className="flow-dot" r="4" fill="#7e6ee3" data-path="M 400 400 Q 600 350 800 400" />
      </svg>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">🤝</span>
            <span className="text-sm font-medium text-purple uppercase tracking-wider">
              Kenapa Memilih Saya?
            </span>
          </div>
          <h2 className="text-responsive-section font-bold text-white mb-4">
            Keunggulan yang <span className="text-gradient">Saya Tawarkan</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Saya berkomitmen untuk memberikan hasil terbaik dengan pendekatan yang 
            profesional dan berorientasi pada kepuasan klien.
          </p>
        </div>

        {/* Reasons Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className={`reason-card group relative p-8 glass rounded-2xl border border-white/5 hover:border-purple/30 transition-all duration-500 ${
                  index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 mb-6 rounded-xl bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-purple" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {reason.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-transparent rounded-2xl" />
                </div>

                {/* Number badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-xs font-medium text-white/40">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">
            Tertarik untuk bekerja sama? Mari diskusikan proyek Anda.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple hover:bg-purple-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-glow-lg"
          >
            <span>Mulai Proyek</span>
            <Sparkles className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
