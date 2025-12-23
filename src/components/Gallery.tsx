'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const categories = ['Tumu', 'Salon', 'Ekipman', 'Dersler', 'Etkinlikler']

const galleryItems = [
  { id: 1, category: 'Salon', title: 'Ana Antrenman Alani' },
  { id: 2, category: 'Ekipman', title: 'Serbest Agirlik Bolumu' },
  { id: 3, category: 'Dersler', title: 'Grup Spinning Dersi' },
  { id: 4, category: 'Salon', title: 'Cardio Alani' },
  { id: 5, category: 'Ekipman', title: 'Fonksiyonel Antrenman' },
  { id: 6, category: 'Etkinlikler', title: 'Fitness Yarismasi' },
  { id: 7, category: 'Dersler', title: 'Yoga Seansı' },
  { id: 8, category: 'Salon', title: 'VIP Antrenman Alani' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Tumu')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredItems = activeCategory === 'Tumu'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className="section w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
            Galeri
          </span>
          <h2 className="section-title mt-2">
            Tesislerimizi
            <span className="gradient-text"> Kesfedin</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Modern ekipmanlarimiz ve ferah ortamimizla size en iyi
            antrenman deneyimini sunuyoruz.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'bg-[var(--background-card)] text-[var(--foreground-muted)] hover:text-white border border-[var(--border)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div
                className={`bg-gradient-to-br from-[var(--accent-primary)]/30 to-[var(--background-tertiary)] ${
                  index === 0 ? 'aspect-square' : 'aspect-square'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-30">📷</span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-[var(--accent-primary)] text-sm">{item.category}</p>
                </div>
              </div>

              {/* Border effect on hover */}
              <div className="absolute inset-0 border-2 border-[var(--accent-primary)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 bg-[var(--background-card)] rounded-full flex items-center justify-center hover:bg-[var(--accent-primary)] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-w-4xl w-full aspect-video bg-[var(--background-card)] rounded-2xl flex items-center justify-center">
              <span className="text-6xl opacity-50">📷</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
