'use client'

import { Target, Users, Award, Clock } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Hedef Odakli',
    description: 'Kisisellestirilmis antrenman programlariyla hedeflerinize ulasin.'
  },
  {
    icon: Users,
    title: 'Topluluk Ruhu',
    description: 'Motive edici ortam ve destekleyici toplulugumuzla buyuyun.'
  },
  {
    icon: Award,
    title: 'Uzman Kadro',
    description: 'Sertifikali antrenorlerimiz size en iyi rehberligi saglar.'
  },
  {
    icon: Clock,
    title: '7/24 Erisim',
    description: 'Istediginiz saatte spor yapma ozgurlugu.'
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#111111]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-[#FF3D00] font-semibold tracking-wider uppercase text-sm">
              Hakkimizda
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              Guclu Bir Yasam Icin
              <span className="gradient-text block">Profesyonel Destek</span>
            </h2>
            <p className="text-[#A0A0A0] mb-4">
              GYMM olarak, fitness yolculugunuzda yaninizdayiz. Modern tesislerimiz,
              son teknoloji ekipmanlarimiz ve uzman kadromuzla saglikli bir yasam
              icin ihtiyaciniz olan her seyi sunuyoruz.
            </p>
            <p className="text-[#A0A0A0] mb-8">
              2015 yilindan bu yana binlerce kisinin hedeflerine ulasmesina yardimci olduk.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#FF3D00]/10 rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-[#FF3D00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="text-sm text-[#A0A0A0] mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] bg-[#151515] rounded-2xl border border-[#2A2A2A] flex items-center justify-center">
                  <span className="text-6xl opacity-40">💪</span>
                </div>
                <div className="aspect-square bg-[#151515] rounded-2xl border border-[#2A2A2A] flex items-center justify-center">
                  <span className="text-5xl opacity-40">🏋️</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-[#151515] rounded-2xl border border-[#2A2A2A] flex items-center justify-center">
                  <span className="text-5xl opacity-40">🎯</span>
                </div>
                <div className="aspect-[4/5] bg-[#151515] rounded-2xl border border-[#2A2A2A] flex items-center justify-center">
                  <span className="text-6xl opacity-40">🔥</span>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-xl p-5">
              <div className="text-3xl font-bold text-[#FF3D00]">10+</div>
              <div className="text-sm text-[#A0A0A0]">Yillik Deneyim</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
