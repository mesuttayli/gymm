'use client'

import { Instagram } from 'lucide-react'

const trainers = [
  {
    name: 'Ahmet Yilmaz',
    specialty: 'Guc & Kondisyon',
    description: '10 yillik deneyim ile profesyonel sporculara ve amatörlere antrenman veriyor.',
    image: null,
    instagram: '#'
  },
  {
    name: 'Elif Demir',
    specialty: 'Yoga & Pilates',
    description: 'Sertifikali yoga egitmeni. Zihin-beden baglantisi uzerine uzmanlasmis.',
    image: null,
    instagram: '#'
  },
  {
    name: 'Mehmet Kaya',
    specialty: 'Fonksiyonel Fitness',
    description: 'CrossFit Level 2 sertifikali. Rekabetci sporculara performans antremani.',
    image: null,
    instagram: '#'
  },
  {
    name: 'Zeynep Ozturk',
    specialty: 'Beslenme & Fitness',
    description: 'Diyetisyen ve fitness antrenoru. Butunsel saglik yaklasimi ile calisir.',
    image: null,
    instagram: '#'
  },
  {
    name: 'Can Arslan',
    specialty: 'Vucut Gelistirme',
    description: 'IFBB Pro sporcu. Yarisma hazirligi ve vucut sekillendirme uzmani.',
    image: null,
    instagram: '#'
  },
  {
    name: 'Selin Yildiz',
    specialty: 'HIIT & Cardio',
    description: 'Yuksek yogunluklu antrenmanlarda uzman. Grup derslerinde enerji kaynagi.',
    image: null,
    instagram: '#'
  }
]

export default function Trainers() {
  return (
    <section id="trainers" className="section bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
            Uzman Kadromuz
          </span>
          <h2 className="section-title mt-2">
            Profesyonel
            <span className="gradient-text"> Antrenorler</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Alaninda uzman antrenorlerimiz, hedeflerinize ulasmaniz icin
            size rehberlik etmeye hazir.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-[var(--background-card)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all duration-300">
                {/* Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--background-tertiary)] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[var(--background-secondary)] border-2 border-[var(--border)] flex items-center justify-center">
                      <span className="text-5xl">👤</span>
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social link */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href={trainer.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[var(--accent-primary)] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-[var(--accent-primary)] font-medium text-sm mt-1">
                    {trainer.specialty}
                  </p>
                  <p className="text-[var(--foreground-muted)] text-sm mt-3">
                    {trainer.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
