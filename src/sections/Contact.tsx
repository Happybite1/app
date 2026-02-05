import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Globe, Send, Github, Linkedin, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rahmatsito801@gmail.com',
    href: 'mailto:rahmatsito801@gmail.com',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+62 898 9514 802',
    href: 'https://wa.me/628989514802',
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Happybite1' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahmat-sito-646649353/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/nyomattss__/' },
  { icon: Globe, label: 'Website', href: '#' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
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

      // Info animation
      gsap.fromTo(
        infoRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'service_2xp6imt',
      'template_n06cbd6',
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      '4bjeRaCLf699kY7Mr'
    );

    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

  } catch (error) {
    console.log(error);
  }

  setIsSubmitting(false);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple/5 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">📞</span>
            <span className="text-sm font-medium text-purple uppercase tracking-wider">
              Hubungi Saya
            </span>
          </div>
          <h2 className="text-responsive-section font-bold text-white mb-4">
            Mari <span className="text-gradient">Bekerja Sama</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Tertarik bekerja sama atau ingin mendiskusikan proyek Anda? 
            Saya siap membantu mewujudkan ide Anda menjadi solusi digital yang berkualitas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="group flex items-center gap-4 p-6 glass rounded-xl border border-white/5 hover:border-purple/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
                      <Icon className="w-6 h-6 text-purple" />
                    </div>
                    <div>
                      <div className="text-sm text-white/50 mb-1">{item.label}</div>
                      <div className="text-white group-hover:text-purple transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Sosial Media</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-white/5 hover:bg-purple/20 flex items-center justify-center text-white/60 hover:text-purple transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="relative p-8 glass rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-white font-semibold mb-2">
                  Respons Cepat
                </h3>
                <p className="text-white/60 text-sm">
                  Saya biasanya merespons dalam waktu 24 jam pada hari kerja. 
                  Untuk pertanyaan urgent, silakan hubungi via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'name' || formData.name
                    ? 'top-2 text-xs text-purple'
                    : 'top-1/2 -translate-y-1/2 text-white/50'
                }`}
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 pt-6 pb-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple transition-all duration-300"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'email' || formData.email
                    ? 'top-2 text-xs text-purple'
                    : 'top-1/2 -translate-y-1/2 text-white/50'
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 pt-6 pb-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple transition-all duration-300"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'message' || formData.message
                    ? 'top-2 text-xs text-purple'
                    : 'top-4 text-white/50'
                }`}
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                className="w-full px-4 pt-6 pb-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-4 bg-purple hover:bg-purple-dark text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                <span>Kirim Pesan</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              
              {isSubmitting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </span>
              )}

              {/* Liquid fill effect */}
              <div className="absolute inset-0 bg-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                style={{
                  clipPath: 'circle(0% at var(--mouse-x, 50%) var(--mouse-y, 50%))',
                }}
              />
            </button>

            {/* Success Message */}
            {isSubmitted && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center animate-fade-in">
                Pesan berhasil dikirim! Saya akan menghubungi Anda segera.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
