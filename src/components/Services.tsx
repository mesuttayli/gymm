'use client'

import { Dumbbell, Heart, Users, User, Zap, Timer } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Dumbbell,
    title: 'Agirlik Calismalari',
    description: 'Profesyonel agirlik calismasi alaniyla kas gelistirme ve guc kazanin.',
    features: ['Serbest Agirliklar', 'Makineler', 'Fonksiyonel']
  },
  {
    icon: Heart,
    title: 'Cardio',
    description: 'Son teknoloji cardio ekipmanlarimizla kondisyonunuzu gelistirin.',
    features: ['Kosun Bandlari', 'Eliptik', 'Kurek']
  },
  {
    icon: Users,
    title: 'Grup Dersleri',
    description: 'Enerjik grup dersleriyle motive olun ve birlikte ter dokelim.',
    features: ['Spinning', 'Yoga', 'Pilates']
  },
  {
    icon: User,
    title: 'Kisisel Antrenman',
    description: 'Bire bir calismayla size ozel program ve surekli takip.',
    features: ['Ozel Program', 'Beslenme', 'Takip']
  },
  {
    icon: Zap,
    title: 'Fonksiyonel Fitness',
    description: 'Gunluk hayatta islevsel guc ve esneklik kazanin.',
    features: ['CrossFit', 'TRX', 'Kettlebell']
  },
  {
    icon: Timer,
    title: 'HIIT Antrenman',
    description: 'Yuksek yogunluklu aralikli antrenmanlarla maksimum yakin.',
    features: ['Kisa Sure', 'Yuksek Verim', 'Yag Yakimi']
  }
]

const packages = [
  {
    name: 'Baslangic',
    price: '499',
    features: ['Sinirsiz Salon Erisimi', 'Temel Ekipman', 'Soyunma Odasi', 'WiFi'],
    popular: false
  },
  {
    name: 'Premium',
    price: '799',
    features: ['Sinirsiz Salon Erisimi', 'Tum Ekipmanlar', 'Grup Dersleri', 'Sauna', 'Kisisel Dolap'],
    popular: true
  },
  {
    name: 'Elite',
    price: '1299',
    features: ['Tum Premium Ozellikler', 'Haftalik PT', 'Beslenme Danismanligi', 'VIP Alan', 'Misafir Hakki'],
    popular: false
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF3D00] font-semibold tracking-wider uppercase text-sm">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Hedefine Uygun <span className="gradient-text">Cozumler</span>
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            Farkli ihtiyac ve hedeflere yonelik genis hizmet yelpazemiz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, i) => (
            <div key={i} className="card group">
              <div className="w-12 h-12 bg-[#FF3D00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF3D00]/20 transition-colors">
                <service.icon className="w-6 h-6 text-[#FF3D00]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-[#A0A0A0] mb-4 text-sm">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((f, j) => (
                  <span key={j} className="text-xs bg-[#111111] text-[#A0A0A0] px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Packages Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF3D00] font-semibold tracking-wider uppercase text-sm">
            Uyelik Paketleri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Sana Uygun <span className="gradient-text">Paketi Sec</span>
          </h2>
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#FF3D00]/20 to-[#151515] border-2 border-[#FF3D00]'
                  : 'bg-[#151515] border border-[#2A2A2A]'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF3D00] text-white text-sm font-semibold px-4 py-1 rounded-full">
                  En Populer
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#FF3D00]">{pkg.price}</span>
                <span className="text-[#A0A0A0]">TL / ay</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-[#A0A0A0]">
                    <span className="w-5 h-5 bg-[#FF3D00]/20 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-[#FF3D00] rounded-full" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full block text-center ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                Hemen Basla
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
