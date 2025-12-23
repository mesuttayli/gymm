'use client'

import { Dumbbell, Heart, Users, User, Zap, Timer } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Dumbbell,
    title: 'Agirlik Calismalari',
    description: 'Profesyonel agirlik calismasi alaniyla kas gelistirme ve guc kazanma hedeflerinize ulasin.',
    features: ['Serbest Agirliklar', 'Makineler', 'Fonksiyonel Antrenman']
  },
  {
    icon: Heart,
    title: 'Cardio',
    description: 'Son teknoloji cardio ekipmanlarimizla dayaniklilik ve kondisyonunuzu gelistirin.',
    features: ['Kosun Bandlari', 'Eliptik Bisikletler', 'Kurekleri']
  },
  {
    icon: Users,
    title: 'Grup Dersleri',
    description: 'Enerjik grup dersleriyle motive olun ve birlikte ter dokelim.',
    features: ['Spinning', 'Yoga', 'Pilates', 'HIIT']
  },
  {
    icon: User,
    title: 'Kisisel Antrenman',
    description: 'Bire bir calismayla size ozel program ve surekli takip.',
    features: ['Ozel Program', 'Beslenme Danismanligi', 'Ilerleme Takibi']
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
    period: 'ay',
    features: [
      'Sinirsiz Salon Erisimi',
      'Temel Ekipman Kullanimi',
      'Soyunma Odasi',
      'WiFi'
    ],
    isPopular: false
  },
  {
    name: 'Premium',
    price: '799',
    period: 'ay',
    features: [
      'Sinirsiz Salon Erisimi',
      'Tum Ekipmanlar',
      'Grup Dersleri',
      'Soyunma Odasi + Sauna',
      'Kisisel Dolap',
      '1x Antrenor Gorusmesi'
    ],
    isPopular: true
  },
  {
    name: 'Elite',
    price: '1299',
    period: 'ay',
    features: [
      'Tum Premium Ozellikler',
      'Haftalik Kisisel Antrenman',
      'Beslenme Danismanligi',
      'Ozel Antrenman Alani',
      'Misafir Hakki',
      'VIP Etkinlik Erisimi'
    ],
    isPopular: false
  }
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
            Hizmetlerimiz
          </span>
          <h2 className="section-title mt-2">
            Hedefine Uygun
            <span className="gradient-text"> Cozumler</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Farkli ihtiyac ve hedeflere yonelik genis hizmet yelpazemizle
            fitness yolculugunuzu destekliyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <div key={index} className="card group">
              <div className="w-14 h-14 bg-[var(--accent-primary)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                <service.icon className="w-7 h-7 text-[var(--accent-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-[var(--foreground-muted)] mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[var(--background-secondary)] text-[var(--foreground-muted)] px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Membership Packages */}
        <div className="text-center mb-12">
          <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
            Uyelik Paketleri
          </span>
          <h2 className="section-title mt-2">
            Sana Uygun <span className="gradient-text">Paketi Sec</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[var(--accent-primary)]/20 to-[var(--background-card)] border-2 border-[var(--accent-primary)]'
                  : 'bg-[var(--background-card)] border border-[var(--border)]'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-white text-sm font-semibold px-4 py-1 rounded-full">
                  En Populer
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[var(--accent-primary)]">{pkg.price}</span>
                <span className="text-[var(--foreground-muted)]">TL / {pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--foreground-muted)]">
                    <span className="w-5 h-5 bg-[var(--accent-primary)]/20 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full ${pkg.isPopular ? 'btn-primary' : 'btn-secondary'} justify-center`}
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
