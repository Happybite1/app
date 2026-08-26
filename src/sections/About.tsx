import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 6, suffix: '+', label: 'Bulan Pengalaman Magang & Praktik' },
  { value: 3, suffix: '+', label: 'Proyek Web & Sistem Selesai' },
  { value: 100, suffix: '%', label: 'Komitmen & Etos Kerja' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={counterRef} className="counter">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with circle mask
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.15 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );

      // Heading slide in
      gsap.fromTo(
        headingRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );

      // Content paragraphs stagger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll('.content-item');
        gsap.fromTo(
          paragraphs,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
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
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image Column - Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl"
            >
              <img
                src="/profile.jpeg"
                alt="Rahmat Sito Pambudi"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              
              {/* Profile Card Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold text-sm">Rahmat Sito Pambudi</h4>
                    <p className="text-purple-light text-xs">Software Engineer & Web Developer</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-purple/20 flex items-center justify-center text-purple">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:col-span-7 lg:pt-4">
            {/* Section Label */}
            <div className="content-item flex items-center gap-3 mb-4">
              <span className="text-2xl">👤</span>
              <span className="text-sm font-semibold text-purple uppercase tracking-wider">
                Profil & Latar Belakang
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-responsive-section font-bold text-white mb-6"
            >
              Dedikasi untuk Menghadirkan <span className="text-gradient">Solusi Web Berkualitas</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 text-white/75 leading-relaxed text-sm sm:text-base">
              <p className="content-item">
                Saya adalah lulusan jurusan <strong>Rekayasa Perangkat Lunak (RPL)</strong> dari <strong>SMK Nusantara 1 Kota Tangerang (Lulus 2026)</strong>. Memiliki minat mendalam pada pengembangan aplikasi web, logika pemrograman backend, serta perancangan antarmuka pengguna yang responsif dan fungsional.
              </p>
              <p className="content-item">
                Selama masa <strong>Praktik Kerja Lapangan (PKL) / Magang</strong>, saya dipercaya memegang peran sebagai <strong>IT Support, Web & Multimedia Specialist</strong>. Tanggung jawab nyata saya mencakup pengembangan dan pemeliharaan website profil perusahaan, pembuatan formulir dinamis pengumpulan data pengguna, serta perancangan materi visual kampanye digital.
              </p>
              <p className="content-item">
                Saya terbiasa bekerja dengan struktur kode yang rapi, berorientasi pada penyelesaian masalah (*problem-solving*), serta siap beradaptasi dan berkembang secara optimal di lingkungan kerja profesional.
              </p>
            </div>

            {/* Key Attributes Badges */}
            <div className="content-item grid sm:grid-cols-3 gap-3 my-8">
              <div className="p-3.5 rounded-xl glass border border-white/5 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-purple flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-white/50">Pendidikan</div>
                  <div className="text-xs font-semibold text-white">SMK RPL (2026)</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass border border-white/5 flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-purple flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-white/50">Keahlian</div>
                  <div className="text-xs font-semibold text-white">Full Stack & Media</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass border border-white/5 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-white/50">Domisili / Kerja</div>
                  <div className="text-xs font-semibold text-white">Tangerang / Jabodetabek</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="content-item grid grid-cols-3 gap-4 sm:gap-6 mt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 glass rounded-2xl border border-white/5 hover:border-purple/30 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-4xl font-bold text-purple mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/60 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

