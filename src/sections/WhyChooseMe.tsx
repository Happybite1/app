import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Zap, 
  Users, 
  CheckCircle2, 
  Calendar,
  Building2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    type: 'experience',
    icon: Briefcase,
    role: 'IT Support, Web & Multimedia Specialist',
    company: 'Praktik Kerja Lapangan (PKL) / Magang',
    period: '2025 — 2026',
    location: 'Tangerang, Indonesia',
    description: 'Bertanggung jawab dalam pemeliharaan sistem web, pembuatan fitur pengumpulan data pengguna, serta perancangan aset multimedia promosi.',
    achievements: [
      'Mengembangkan formulir interaktif website untuk mendukung alur pengumpulan data calon pengguna.',
      'Melakukan maintenance berkala, perbaikan bug minor, dan optimasi performa pada website profil perusahaan.',
      'Memproduksi e-flyer promosi dan menyunting video testimoni untuk kampanye pemasaran digital.',
    ],
  },
  {
    type: 'education',
    icon: GraduationCap,
    role: 'Rekayasa Perangkat Lunak (RPL)',
    company: 'SMK Nusantara 1 Kota Tangerang',
    period: '2023 — 2026',
    location: 'Kota Tangerang',
    description: 'Menempuh pendidikan vokasi kejuruan dengan fokus intensif pada software engineering, arsitektur database, dan web development.',
    achievements: [
      'Mendalami logika pemrograman, Object-Oriented Programming (OOP), dan MVC Framework.',
      'Membangun berbagai proyek web menggunakan PHP, framework Laravel, dan database MySQL.',
      'Mempelajari dasar-dasar UI/UX design, version control (Git/GitHub), dan pengujian sistem.',
    ],
  },
];

const workEthics = [
  {
    icon: Code2,
    title: 'Clean & Structured Code',
    description: 'Menulis kode yang rapi, mengikuti konvensi penamaan standar, terstruktur, dan mudah dipahami untuk kolaborasi tim jangka panjang.',
  },
  {
    icon: Zap,
    title: 'Cepat Belajar & Adaptif',
    description: 'Antusiasme tinggi dalam mengeksplorasi teknologi baru dan cepat beradaptasi dengan stack/tools yang digunakan perusahaan.',
  },
  {
    icon: Users,
    title: 'Komunikasi & Kerja Sama',
    description: 'Mampu berkomunikasi secara transparan terkait progres tugas, proaktif berdiskusi, dan dapat diandalkan dalam tim.',
  },
];

export default function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ethicsRef = useRef<HTMLDivElement>(null);

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

      // Timeline items animation
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.timeline-card');
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Ethics cards animation
      if (ethicsRef.current) {
        const cards = ethicsRef.current.querySelectorAll('.ethic-card');
        gsap.fromTo(
          cards,
          { scale: 0.9, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: ethicsRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-[200px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">💼</span>
            <span className="text-sm font-semibold text-purple uppercase tracking-wider">
              Riwayat & Pengalaman
            </span>
          </div>
          <h2 className="text-responsive-section font-bold text-white mb-4">
            Pengalaman Kerja & <span className="text-gradient">Pendidikan</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Rekam jejak praktis, pengalaman magang industri, serta latar belakang pendidikan kejuruan software engineering.
          </p>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="max-w-4xl mx-auto space-y-8 mb-20">
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="timeline-card group relative p-6 sm:p-8 glass rounded-3xl border border-white/10 hover:border-purple/40 transition-all duration-500 shadow-xl"
              >
                {/* Header of Item */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/5">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple/15 flex items-center justify-center text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-light font-medium mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{item.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-purple" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Achievements Bullet Points */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Kontribusi & Pencapaian Kunci:
                  </div>
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Work Ethics / Strengths */}
        <div ref={ethicsRef} className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Nilai & Keunggulan yang Saya Bawa ke Tim Anda
            </h3>
            <p className="text-white/50 text-xs sm:text-sm">
              Prinsip kerja profesional yang selalu saya junjung tinggi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {workEthics.map((ethic, index) => {
              const Icon = ethic.icon;
              return (
                <div
                  key={index}
                  className="ethic-card p-6 glass rounded-2xl border border-white/5 hover:border-purple/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 mb-4 rounded-xl bg-purple/10 flex items-center justify-center text-purple">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {ethic.title}
                    </h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                      {ethic.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple hover:bg-purple-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-glow-lg"
          >
            <span>Diskusikan Kebutuhan Tim / Perusahaan</span>
          </a>
        </div>
      </div>
    </section>
  );
}

