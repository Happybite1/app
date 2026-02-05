import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1, suffix: '+', label: 'Tahun Pengalaman' },
  { value: 5, suffix: '+', label: 'Proyek Selesai' },
  { value: 5, suffix: '+', label: 'Klien Puas' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2,
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
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Heading slide in
      gsap.fromTo(
        headingRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              once: true,
            },
          }
        );
      }

      // Image scale on scroll
      gsap.to(imageRef.current, {
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Column - Sticky */}
          <div className="lg:sticky lg:top-32">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden lens-zoom"
            >
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-purple/30 rounded-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:pt-12">
            {/* Section Label */}
            <div className="content-item flex items-center gap-3 mb-6">
              <span className="text-3xl">👤</span>
              <span className="text-sm font-medium text-purple uppercase tracking-wider">
                Tentang Saya
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-responsive-section font-bold text-white mb-8"
            >
              Pengembang Web yang Berfokus pada{' '}
              <span className="text-gradient">Solusi Digital</span>
            </h2>

            {/* Description */}
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p className="content-item">
                Saya adalah seorang pengembang web yang berfokus pada pembuatan sistem dan 
                website profesional. Saya memiliki ketertarikan dalam mengembangkan solusi 
                digital yang efektif, responsif, dan mudah digunakan.
              </p>
              <p className="content-item">
                Saya percaya bahwa sebuah website bukan hanya sekadar tampilan, tetapi juga 
                representasi identitas dan kualitas sebuah brand. Oleh karena itu, saya selalu 
                mengutamakan detail, performa, dan pengalaman pengguna dalam setiap proyek.
              </p>
              <p className="content-item">
                Dengan pengalaman lebih dari 1 tahun di industri ini, saya telah membantu 
                berbagai klien dari berbagai sektor untuk mewujudkan visi digital mereka. 
                Setiap proyek adalah kesempatan baru untuk menciptakan sesuatu yang luar biasa.
              </p>
            </div>

            {/* Stats */}
            <div className="content-item grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 glass rounded-xl hover:border-purple/30 transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
