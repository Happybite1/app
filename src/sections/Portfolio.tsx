import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Platform Dahsbord Company Profile',
    category: 'Corporate',
    description: 'Platform dashboard untuk profil perusahaan dengan fitur real-time analytics.',
    image: '/portofolio-4.png',
    tags: ['Laravel', 'Blade', 'MYSQL'],
  },
  {
    title: 'Sistem Manajemen Business',
    category: 'Business',
    description: 'Sistem lengkap untuk mengelola stok pelanggan, produksi, dan laporan penjualan.',
    image: '/portofolio-5.png',
    tags: ['Laravel', 'Blade', 'MySQL'],
  },
  {
    title: 'Website Portofolio Kreatif',
    category: 'Creative',
    description: 'Website portofolio elegan untuk kreator dan desainer dengan animasi smooth.',
    image: '/',
    tags: ['Next.js', 'GSAP', 'Tailwind'],
  },
  {
    title: 'Aplikasi Manajemen Tugas',
    category: 'Productivity',
    description: 'Aplikasi kolaboratif untuk tim dengan kanban board dan real-time updates.',
    image: '/',
    tags: ['React', 'Firebase', 'TypeScript'],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      // Horizontal scroll
      if (trackRef.current && containerRef.current) {
        const cards = trackRef.current.querySelectorAll('.portfolio-card');
        const isMobile = window.innerWidth < 768;
        const totalWidth = trackRef.current.scrollWidth - window.innerWidth + (isMobile ? 50 : 100);

        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Card entrance animations
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Header */}
      <div ref={headingRef} className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🧩</span>
              <span className="text-sm font-medium text-purple uppercase tracking-wider">
                Portofolio
              </span>
            </div>
            <h2 className="text-responsive-section font-bold text-white">
              Proyek <span className="text-gradient">Terbaru</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md">
            Setiap proyek yang saya kerjakan dirancang dengan strategi, kreativitas, 
            dan teknologi terbaik untuk membantu klien mencapai tujuan digital mereka.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-12 xl:px-20"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card group relative flex-shrink-0 w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[45vw]"
            >
              <div className="relative overflow-hidden rounded-2xl bg-dark-light">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-purple/20 backdrop-blur-sm text-purple text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* External Link */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-purple rounded-full flex items-center justify-center transition-colors">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-3 py-1 text-xs bg-white/5 text-white/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-purple hover:text-white transition-colors group/link"
                  >
                    <span className="text-sm font-medium">Lihat Proyek</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* View All Card */}
          <div className="portfolio-card group relative flex-shrink-0 w-[95vw] sm:w-[80vw] md:w-[40vw] lg:w-[30vw]">
            <div className="relative h-full min-h-[400px] flex flex-col items-center justify-center p-8 glass rounded-2xl border border-dashed border-white/20 hover:border-purple/50 transition-colors">
              <div className="w-20 h-20 mb-6 rounded-full bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
                <ArrowUpRight className="w-10 h-10 text-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Lihat Semua Proyek
              </h3>
              <p className="text-white/60 text-sm text-center mb-6">
                Jelajahi lebih banyak karya yang telah saya kerjakan
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple hover:bg-purple-dark text-white font-medium rounded-full transition-all duration-300 hover:shadow-glow"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mt-8">
        <div className="flex items-center gap-4 text-white/40 text-sm">
          <div className="flex-1 h-px bg-white/10" />
          <span>Geser untuk melihat lebih banyak</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
