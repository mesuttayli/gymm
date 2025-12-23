'use client'

import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--background)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />

        {/* Background pattern - simulating gym equipment */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF3D00' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--accent-primary)]/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--background-card)]/80 border border-[var(--border)] rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[var(--accent-secondary)] rounded-full animate-pulse" />
            <span className="text-sm text-[var(--foreground-muted)]">Profesyonel Fitness Deneyimi</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="block">GUCUNU</span>
            <span className="block gradient-text">KESFET</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10">
            Modern ekipmanlar, uzman antrenorler ve motive edici ortamimizla
            hedeflerine ulasmak icin ihtiyacin olan her sey burada.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact" className="btn-primary text-lg px-8 py-4">
              Hemen Basla
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-secondary text-lg px-8 py-4 group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Tanitim Videosu
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-16 border-t border-[var(--border)]">
            {[
              { value: '500+', label: 'Aktif Uye' },
              { value: '15+', label: 'Uzman Antrenor' },
              { value: '50+', label: 'Haftalik Ders' },
              { value: '7/24', label: 'Acik' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[var(--accent-primary)]">{stat.value}</div>
                <div className="text-sm text-[var(--foreground-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
        <div className="w-6 h-10 border-2 border-[var(--foreground-muted)] rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-[var(--accent-primary)] rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
