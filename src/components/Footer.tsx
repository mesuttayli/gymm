'use client'

import Link from 'next/link'
import { Dumbbell, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

const quickLinks = [
  { href: '#about', label: 'Hakkimizda' },
  { href: '#services', label: 'Hizmetler' },
  { href: '#trainers', label: 'Antrenorler' },
  { href: '#schedule', label: 'Ders Programi' },
  { href: '#gallery', label: 'Galeri' },
  { href: '#contact', label: 'Iletisim' },
]

const services = [
  'Agirlik Calismalari',
  'Cardio',
  'Grup Dersleri',
  'Kisisel Antrenman',
  'CrossFit',
  'Yoga & Pilates',
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border)] w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                GYM<span className="text-[var(--accent-primary)]">M</span>
              </span>
            </Link>
            <p className="text-[var(--foreground-muted)] text-sm mb-6">
              Modern ekipmanlar, uzman antrenorler ve motive edici ortamimizla
              fitness hedeflerinize ulasmaniz icin yaninizdayiz.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-[var(--background-card)] border border-[var(--border)] rounded-lg flex items-center justify-center hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hizli Linkler</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-[var(--foreground-muted)] text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Iletisim</h4>
            <ul className="space-y-3 text-sm text-[var(--foreground-muted)]">
              <li>
                <strong className="text-white">Adres:</strong>
                <br />
                Ornek Mahallesi, Fitness Caddesi No: 123
                <br />
                Kadikoy, Istanbul
              </li>
              <li>
                <strong className="text-white">Telefon:</strong>
                <br />
                +90 212 XXX XX XX
              </li>
              <li>
                <strong className="text-white">E-posta:</strong>
                <br />
                info@gymm.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--foreground-muted)]">
            © {new Date().getFullYear()} GYMM. Tum hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-[var(--foreground-muted)]">
            <Link href="#" className="hover:text-white transition-colors">
              Gizlilik Politikasi
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Kullanim Sartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
