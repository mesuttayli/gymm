'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeroSettings {
  videoUrl: string
  showVideo: boolean
}

export default function Hero() {
  const [settings, setSettings] = useState<HeroSettings>({
    videoUrl: '',
    showVideo: false
  })

  useEffect(() => {
    fetch('/api/settings/hero')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings(data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {settings.showVideo && settings.videoUrl ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="video-bg"
          >
            <source src={settings.videoUrl} type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </>
      ) : (
        <div className="absolute inset-0 z-0">
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), #0A0A0A)'
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent, rgba(0,0,0,0.8))'
            }}
          />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF3D00' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Animated gradient orbs */}
          <div
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
            style={{ backgroundColor: 'rgba(255, 61, 0, 0.2)' }}
          />
          <div
            className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
            style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', animationDelay: '1s' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            style={{
              backgroundColor: 'rgba(21, 21, 21, 0.8)',
              border: '1px solid #2A2A2A',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#00FF88' }}
            />
            <span className="text-sm" style={{ color: '#A0A0A0' }}>
              Profesyonel Fitness Deneyimi
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white leading-tight">
            <span className="block">GUCUNU</span>
            <span className="block gradient-text">KESFET</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#A0A0A0' }}
          >
            Modern ekipmanlar, uzman antrenorler ve motive edici ortamimizla
            hedeflerine ulasmak icin ihtiyacin olan her sey burada.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="#contact" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Hemen Basla
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16"
            style={{ borderTop: '1px solid #2A2A2A' }}
          >
            {[
              { value: '500+', label: 'Aktif Uye' },
              { value: '15+', label: 'Uzman Antrenor' },
              { value: '50+', label: 'Haftalik Ders' },
              { value: '7/24', label: 'Acik' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  style={{ color: '#FF3D00' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: '#A0A0A0' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
        <div
          className="w-6 h-10 rounded-full flex justify-center"
          style={{ border: '2px solid #A0A0A0' }}
        >
          <div
            className="w-1.5 h-3 rounded-full mt-2 animate-pulse"
            style={{ backgroundColor: '#FF3D00' }}
          />
        </div>
      </div>
    </section>
  )
}
