import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Layers, 
  Database, 
  Server, 
  Wrench, 
  GitBranch, 
  Palette, 
  Video, 
  Cpu, 
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'design';

interface SkillItem {
  icon: any;
  title: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  categoryLabel: string;
  level: string;
  description: string;
  features: string[];
}

const skillsData: SkillItem[] = [
  // Backend & DB
  {
    icon: Server,
    title: 'PHP (Native & OOP)',
    category: 'backend',
    categoryLabel: 'Backend Development',
    level: 'Mahir / Utama',
    description: 'Pemrograman backend dengan paradigma OOP, arsitektur MVC, pengolahan sesi pengguna, dan pembuatan endpoint REST API yang handal.',
    features: ['Object-Oriented Programming', 'MVC Architecture', 'RESTful API', 'Session & Auth'],
  },
  {
    icon: Database,
    title: 'Laravel Framework',
    category: 'backend',
    categoryLabel: 'Backend Development',
    level: 'Framework Utama',
    description: 'Pengembangan sistem web modern dengan Eloquent ORM, Blade templating, migrasi database, middleware, dan sistem autentikasi aman.',
    features: ['Eloquent ORM', 'Blade Template Engine', 'Database Migrations', 'Form Validation'],
  },
  {
    icon: Database,
    title: 'MySQL & Database Design',
    category: 'backend',
    categoryLabel: 'Database',
    level: 'Relational DB',
    description: 'Perancangan skema relasi database (ERD), optimasi query SQL, integritas foreign key, dan operasi CRUD kompleks.',
    features: ['Relational Schema / ERD', 'Query Optimization', 'Foreign Keys', 'Data Integrity'],
  },

  // Frontend
  {
    icon: Code2,
    title: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Frontend Development',
    level: 'Intermediate',
    description: 'Manipulasi DOM dinamis, asynchronous JS (Fetch API, Promises, Async/Await), dan penanganan event interaktif di browser.',
    features: ['ES6+ Syntax', 'Async / Await', 'DOM Manipulation', 'Event Handling'],
  },
  {
    icon: Globe,
    title: 'HTML5 & Semantic Markup',
    category: 'frontend',
    categoryLabel: 'Frontend Development',
    level: 'Standar Industri',
    description: 'Penyusunan struktur halaman web yang semantik, ramah SEO, dan memenuhi kaidah aksesibilitas web modern.',
    features: ['Semantic HTML', 'SEO Friendly', 'Accessibility', 'Web Standards'],
  },
  {
    icon: Layers,
    title: 'CSS3, Tailwind & Bootstrap',
    category: 'frontend',
    categoryLabel: 'Frontend Styling',
    level: 'Responsive UI',
    description: 'Penerapan antarmuka responsif menggunakan Tailwind CSS utility classes, Bootstrap 5 grid system, dan CSS Flexbox/Grid.',
    features: ['Tailwind CSS', 'Bootstrap 5', 'Flexbox & CSS Grid', 'Mobile-First Design'],
  },

  // Tools
  {
    icon: GitBranch,
    title: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'Version Control',
    level: 'Kolaborasi & VCS',
    description: 'Manajemen versi kode, branching, commit convention rapi, repository management, dan alur kerja kolaboratif tim.',
    features: ['Version Control', 'Branching & Merging', 'Pull Requests', 'Git Workflow'],
  },
  {
    icon: Wrench,
    title: 'Development Tools & Env',
    category: 'tools',
    categoryLabel: 'Workflow & Tools',
    level: 'Dev Environment',
    description: 'Penggunaan tool esensial seperti Laragon, XAMPP, Postman untuk testing API, VS Code, dan NodeJS/NPM.',
    features: ['Laragon / XAMPP', 'Postman API Testing', 'VS Code', 'NPM / Composer'],
  },

  // Design & Media
  {
    icon: Palette,
    title: 'Canva & UI Design',
    category: 'design',
    categoryLabel: 'Graphic Design',
    level: 'Visual Asset',
    description: 'Perancangan visual e-flyer promosi media sosial, materi kampanye iklan digital, serta mockup layout website.',
    features: ['Social Media E-Flyer', 'Brand Assets', 'Digital Ads Banner', 'UI Mockup'],
  },
  {
    icon: Video,
    title: 'CapCut & Video Editing',
    category: 'design',
    categoryLabel: 'Multimedia',
    level: 'Content Production',
    description: 'Produksi dan penyuntingan video promosi/testimoni dengan transisi halus, color grading, audio mixing, dan subtitil dinamis.',
    features: ['Testimonial Videos', 'Social Media Reels', 'Color Grading', 'Audio Sync'],
  },
];

const categoryTabs: { id: SkillCategory; label: string; icon: any }[] = [
  { id: 'all', label: 'Semua Keahlian', icon: Cpu },
  { id: 'backend', label: 'Backend & Database', icon: Server },
  { id: 'frontend', label: 'Frontend Development', icon: Code2 },
  { id: 'tools', label: 'Tools & Workflow', icon: Wrench },
  { id: 'design', label: 'Desain & Multimedia', icon: Palette },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.skill-card-item');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple/10 rounded-full blur-[160px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple/5 rounded-full blur-[120px]" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">⚡</span>
            <span className="text-sm font-semibold text-purple uppercase tracking-wider">
              Keahlian & Teknologi
            </span>
          </div>
          <h2 className="text-responsive-section font-bold text-white mb-4">
            Kompetensi Teknis <span className="text-gradient">Yang Dikuasai</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Kombinasi kemampuan pengembangan backend yang kokoh, antarmuka web yang interaktif, serta keterampilan multimedia penunjang industri digital.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-purple text-white shadow-glow'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="skill-card-item group relative p-6 sm:p-7 glass rounded-2xl border border-white/5 hover:border-purple/35 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-purple/15 flex items-center justify-center text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 text-[11px] font-medium bg-purple/10 text-purple-light rounded-full border border-purple/20">
                      {skill.level}
                    </span>
                  </div>

                  {/* Title & Category Subtitle */}
                  <div className="mb-1 text-[11px] font-medium text-white/40 uppercase tracking-wider">
                    {skill.categoryLabel}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple transition-colors">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {skill.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-2.5 py-1 text-[11px] bg-white/5 text-white/70 rounded-md border border-white/5"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

