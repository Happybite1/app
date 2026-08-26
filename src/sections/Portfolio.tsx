import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  category: string;
  role: string;
  description: string;
  features: string[];
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
}

const projects: ProjectItem[] = [
  {
    title: 'Dashboard & CMS Company Profile',
    category: 'Web Application',
    role: 'Full Stack Developer (Laravel & MySQL)',
    description: 'Sistem dashboard manajemen konten profil perusahaan dengan fitur analitik pengunjung, manajemen formulir interaktif pengumpulan data pengguna, serta panel admin yang aman.',
    features: ['Autentikasi Admin Multi-Role', 'Formulir Kontak Dinamis', 'Manajemen Konten / CMS', 'Integrasi Database MySQL'],
    image: '/portofolio-4.png',
    tags: ['Laravel', 'Blade', 'MySQL', 'Bootstrap 5', 'REST API'],
    githubUrl: 'https://github.com/Happybite1',
    demoUrl: '#',
  },
  {
    title: 'Sistem Informasi Manajemen Bisnis & Stok',
    category: 'Enterprise System',
    role: 'Backend & Database Developer',
    description: 'Aplikasi pengelolaan inventaris barang, pendataan riwayat transaksi pelanggan, alur produksi harian, dan rekapitulasi laporan penjualan otomatis dengan visualisasi performa.',
    features: ['Manajemen Stok & Transaksi', 'Rekap Laporan Otomatis', 'Visualisasi Grafik Penjualan', 'Validasi Data Komprehensif'],
    image: '/portofolio-5.png',
    tags: ['Laravel', 'Blade', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    githubUrl: 'https://github.com/Happybite1',
    demoUrl: '#',
  },
  {
    title: 'Koleksi Desain Digital & Media Promosi',
    category: 'Graphic & Video Design',
    role: 'Graphic Designer & Video Editor',
    description: 'Produksi aset visual promosi mencakup e-flyer media sosial, materi iklan digital, serta penyuntingan video testimoni dan reels untuk meningkatkan konversi dan engagement.',
    features: ['E-Flyer Promosi Media Sosial', 'Video Testimoni & Reels', 'Brand Assets & Banner Ads', 'Desain Mockup UI/UX'],
    image: '/portofolio-6.png',
    tags: ['Canva', 'CapCut', 'UI/UX Design', 'Social Media Ads', 'Video Editing'],
    githubUrl: 'https://github.com/Happybite1',
    demoUrl: '#',
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
        { y: 40, opacity: 0 },
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
        const totalWidth = trackRef.current.scrollWidth - window.innerWidth + (isMobile ? 40 : 80);

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
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
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
      <div ref={headingRef} className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧩</span>
              <span className="text-sm font-semibold text-purple uppercase tracking-wider">
                Studi Kasus & Portofolio
              </span>
            </div>
            <h2 className="text-responsive-section font-bold text-white">
              Proyek <span className="text-gradient">Unggulan</span>
            </h2>
          </div>
          <p className="text-white/65 max-w-lg text-sm sm:text-base leading-relaxed">
            Setiap proyek dikembangkan dengan fokus pada kebutuhan operasional, efisiensi arsitektur kode, serta antarmuka yang ramah pengguna.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative min-h-[640px] flex items-center">
        <div
          ref={trackRef}
          className="flex gap-8 px-4 sm:px-6 lg:px-12 xl:px-20 items-stretch w-full py-4"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card group relative flex-shrink-0 w-[92vw] sm:w-[80vw] md:w-[58vw] lg:w-[48vw] xl:w-[42vw]"
            >
              <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-dark-light/80 border border-white/10 hover:border-purple/40 transition-all duration-500 shadow-2xl glass">
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-dark-light/40 to-transparent opacity-90" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 bg-purple/30 backdrop-blur-md text-purple-light text-xs font-semibold rounded-full border border-purple/30 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Index */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md text-white/60 text-xs font-mono rounded-lg border border-white/10">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Role Tag */}
                    <div className="text-xs text-purple-light font-medium mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{project.role}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-purple transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Key Features (STAR format) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5 py-3 px-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIndex) => (
                        <span
                          key={tIndex}
                          className="px-2.5 py-1 text-[11px] font-medium bg-purple/10 text-purple-light rounded-md border border-purple/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons (GitHub & Demo) */}
                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-purple text-white text-xs sm:text-sm font-medium rounded-xl border border-white/10 hover:border-purple transition-all duration-300 shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                    
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-purple/20 hover:bg-purple text-purple-light hover:text-white text-xs sm:text-sm font-medium rounded-xl border border-purple/30 transition-all duration-300"
                    >
                      <span>Detail Proyek</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* GitHub Profile Card */}
          <div className="portfolio-card group relative flex-shrink-0 w-[92vw] sm:w-[80vw] md:w-[40vw] lg:w-[32vw]">
            <div className="relative h-full min-h-[480px] flex flex-col items-center justify-center p-8 glass rounded-3xl border border-dashed border-white/20 hover:border-purple/50 transition-colors text-center">
              <div className="w-16 h-16 mb-5 rounded-2xl bg-purple/15 flex items-center justify-center group-hover:bg-purple group-hover:text-white text-purple transition-all duration-300 group-hover:scale-110">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Lihat Repositori Lainnya
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mb-6 max-w-xs leading-relaxed">
                Jelajahi source code, eksperimen pengembangan web, dan kontribusi proyek di akun GitHub saya.
              </p>
              <a
                href="https://github.com/Happybite1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple hover:bg-purple-dark text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-glow"
              >
                <span>Buka GitHub @Happybite1</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mt-6">
        <div className="flex items-center gap-4 text-white/40 text-xs sm:text-sm">
          <div className="flex-1 h-px bg-white/10" />
          <span>Geser horizontal untuk menjelajahi proyek ➔</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}

