'use client'

import { Target, Users, Award, Clock } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Hedef Odakli',
    description: 'Kisisellestirilmis antrenman programlariyla hedeflerinize en kisa surede ulasin.'
  },
  {
    icon: Users,
    title: 'Topluluk Ruhu',
    description: 'Motive edici ortam ve destekleyici toplulugumuzla birlikte buyuyun.'
  },
  {
    icon: Award,
    title: 'Uzman Kadro',
    description: 'Sertifikali antrenorlerimiz size en iyi rehberligi saglar.'
  },
  {
    icon: Clock,
    title: '7/24 Erisim',
    description: 'Istediginiz saatte spor yapma ozgurlugune sahip olun.'
  }
]

export default function About() {
  return (
    <section id="about" className="section bg-[var(--background-secondary)] w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
              Hakkimizda
            </span>
            <h2 className="section-title mt-2">
              Guclu Bir Yasam Icin
              <span className="gradient-text block">Profesyonel Destek</span>
            </h2>
            <p className="section-subtitle mt-4">
              GYMM olarak, fitness yolculugunuzda yaninizdayiz. Modern tesislerimiz,
              son teknoloji ekipmanlarimiz ve uzman kadromuzla saglikli bir yasam
              icin ihtiyaciniz olan her seyi sunuyoruz.
            </p>
            <p className="text-[var(--foreground-muted)] mt-4">
              2015 yilindan bu yana binlerce kisinin hedeflerine ulasmesina yardimci olduk.
              Vizyonumuz, herkesin kendi potansiyelini kesfedebilecegi, destekleyici ve
              motive edici bir ortam yaratmaktir.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--accent-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] bg-[var(--background-card)] rounded-2xl overflow-hidden border border-[var(--border)]">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent flex items-center justify-center">
                    <span className="text-6xl opacity-50">💪</span>
                  </div>
                </div>
                <div className="aspect-square bg-[var(--background-card)] rounded-2xl overflow-hidden border border-[var(--border)]">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent-secondary)]/20 to-transparent flex items-center justify-center">
                    <span className="text-5xl opacity-50">🏋️</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-[var(--background-card)] rounded-2xl overflow-hidden border border-[var(--border)]">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent flex items-center justify-center">
                    <span className="text-5xl opacity-50">🎯</span>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-[var(--background-card)] rounded-2xl overflow-hidden border border-[var(--border)]">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent-secondary)]/20 to-transparent flex items-center justify-center">
                    <span className="text-6xl opacity-50">🔥</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-6 max-w-[200px]">
              <div className="text-3xl font-bold text-[var(--accent-primary)]">10+</div>
              <div className="text-sm text-[var(--foreground-muted)]">Yillik Deneyim</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
