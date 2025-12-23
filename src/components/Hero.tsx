'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { value: '500+', label: 'Aktif Uye' },
  { value: '15+', label: 'Uzman Antrenor' },
  { value: '50+', label: 'Haftalik Ders' },
  { value: '7/24', label: 'Acik' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF3D00]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center py-20">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#151515]/80 border border-[#2A2A2A] rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
            <span className="text-sm text-[#A0A0A0]">Profesyonel Fitness Deneyimi</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
            GUCUNU
            <span className="block gradient-text">KESFET</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10">
            Modern ekipmanlar, uzman antrenorler ve motive edici ortamimizla
            hedeflerine ulasmak icin ihtiyacin olan her sey burada.
          </p>

          {/* CTA */}
          <Link href="#contact" className="btn-primary text-lg px-8 py-4">
            Hemen Basla
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-[#2A2A2A]">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF3D00]">{stat.value}</div>
                <div className="text-sm text-[#A0A0A0] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-[#A0A0A0] rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-[#FF3D00] rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
