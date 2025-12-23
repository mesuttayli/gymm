'use client'

import Link from 'next/link'
import { Dumbbell, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

const quickLinks = [
  { href: '#about', label: 'Hakkimizda' },
  { href: '#services', label: 'Hizmetler' },
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
    <footer className="bg-[#111111] border-t border-[#2A2A2A]">
      <div className="container">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#FF3D00] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                GYM<span className="text-[#FF3D00]">M</span>
              </span>
            </Link>
            <p className="text-[#A0A0A0] text-sm mb-6">
              Modern ekipmanlar, uzman antrenorler ve motive edici ortamimizla
              fitness hedeflerinize ulasmaniz icin yaninizdayiz.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-[#151515] border border-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FF3D00] hover:border-[#FF3D00] transition-colors"
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
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#A0A0A0] hover:text-[#FF3D00] transition-colors text-sm"
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
              {services.map((service, i) => (
                <li key={i} className="text-[#A0A0A0] text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Iletisim</h4>
            <ul className="space-y-3 text-sm text-[#A0A0A0]">
              <li>
                <strong className="text-white">Adres:</strong><br />
                Ornek Mah. Fitness Cad. No: 123<br />
                Kadikoy, Istanbul
              </li>
              <li>
                <strong className="text-white">Telefon:</strong><br />
                +90 212 XXX XX XX
              </li>
              <li>
                <strong className="text-white">E-posta:</strong><br />
                info@gymm.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2A2A2A] py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#A0A0A0]">
            © {new Date().getFullYear()} GYMM. Tum haklari saklidir.
          </p>
          <div className="flex gap-6 text-sm text-[#A0A0A0]">
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
