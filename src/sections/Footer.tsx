import { ArrowUp, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Navigasi',
    links: [
      { label: 'Beranda', href: '#hero' },
      { label: 'Tentang', href: '#about' },
      { label: 'Layanan', href: '#services' },
      { label: 'Portofolio', href: '#portfolio' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Website Profesional', href: '#services' },
      { label: 'Sistem Informasi', href: '#services' },
      { label: 'Desain UI/UX', href: '#services' },
      { label: 'Optimasi Performa', href: '#services' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-light to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="text-2xl font-bold text-white mb-4 inline-block">
              Portofolio<span className="text-purple">.</span>
            </a>
            <p className="text-white/60 max-w-md mb-6">
              Mewujudkan ide menjadi solusi digital yang elegan dan fungsional. 
              Saya membantu bisnis Anda tumbuh di dunia digital dengan teknologi modern.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span>Dibuat dengan</span>
              <Heart className="w-4 h-4 text-purple fill-purple" />
              <span>di Indonesia</span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-white/60 hover:text-purple transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Rahmat. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/60 hover:text-purple transition-colors"
          >
            <span className="text-sm">Kembali ke atas</span>
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-purple/20 flex items-center justify-center transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
