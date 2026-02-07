import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Database, 
  Palette, 
  Zap, 
  Settings 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: 'Pengembangan Website Profesional',
    description: 'Website modern, responsif, dan SEO-friendly yang dirancang untuk memaksimalkan presence digital bisnis Anda.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
  },
  {
    icon: Database,
    title: 'Pembuatan Sistem Informasi & Aplikasi Web',
    description: 'Solusi sistem informasi yang powerful dan scalable untuk mengelola data dan proses bisnis Anda.',
    features: ['Custom Development', 'Database Design', 'API Integration'],
  },
  {
    icon: Palette,
    title: 'Desain UI/UX Modern & Responsif',
    description: 'Desain antarmuka yang intuitif dan pengalaman pengguna yang memukau untuk setiap platform.',
    features: ['User Research', 'Wireframing', 'Prototyping'],
  },
  {
    icon: Zap,
    title: 'Optimasi Performa Website',
    description: 'Tingkatkan kecepatan dan performa website Anda untuk pengalaman pengguna yang optimal.',
    features: ['Speed Optimization', 'Code Minification', 'Caching'],
  },
  {
    icon: Settings,
    title: 'Maintenance & Pengembangan Sistem',
    description: 'Dukungan teknis berkelanjutan dan pengembangan fitur baru untuk sistem yang selalu up-to-date.',
    features: ['24/7 Support', 'Regular Updates', 'Bug Fixes'],
  },
];

interface ServiceCardProps {
  service: typeof services[0];
}

function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (cardRef.current && isHovered) {
      gsap.to(cardRef.current, {
        rotateY: mousePosition.x * 15,
        rotateX: -mousePosition.y * 15,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [mousePosition, isHovered]);

  const Icon = service.icon;
  return (
    <div className="service-item h-full pb-8 md:pb-12 relative z-10">
      <div
        ref={cardRef}
        className="service-card group relative h-full"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative p-6 md:p-8 glass rounded-2xl border border-white/5 hover:border-purple/30 transition-all duration-500 h-full overflow-hidden">
          {/* Moving border gradient on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-0">
            <div className="absolute inset-[-50%] bg-gradient-conic from-transparent via-purple/20 to-transparent animate-rotate-slow" />
          </div>

          {/* Content */}
          <div className="relative z-20">
            {/* Icon */}
            <div className="w-12 md:w-14 h-12 md:h-14 mb-4 md:mb-6 rounded-xl bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
              <Icon className="w-6 md:w-7 h-6 md:h-7 text-purple" />
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 group-hover:text-purple transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-4 md:mb-6">{service.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature, fIndex) => (
                <span key={fIndex} className="px-3 py-1 text-xs bg-white/5 text-white/70 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(126, 110, 227, 0.15), transparent 50%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards deal out animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { 
            y: 100, 
            opacity: 0, 
            rotateZ: (i) => (i % 2 === 0 ? -5 : 5),
          },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );

        // Parallax stagger on scroll
        cards.forEach((card, i) => {
          const isMobile = window.innerWidth < 768;
          const offset = isMobile ? 5 : (i % 2 === 0 ? -40 : 40);
          
          gsap.to(card, {
            y: offset,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-purple/5 rounded-full blur-[100px]" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">💼</span>
            <span className="text-sm font-medium text-purple uppercase tracking-wider">
              Layanan
            </span>
          </div>
          <h2 className="text-responsive-section font-bold text-white mb-4">
            Solusi Digital <span className="text-gradient">Lengkap</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Saya menyediakan berbagai layanan pengembangan web dan desain untuk 
            membantu bisnis Anda berkembang di dunia digital.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-14 lg:gap-10"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
