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
  { id: 7, category: 'Dersler', title: 'Yoga Seansi' },
  { id: 8, category: 'Salon', title: 'VIP Antrenman Alani' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Tumu')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredItems = activeCategory === 'Tumu'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#111111]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF3D00] font-semibold tracking-wider uppercase text-sm">
            Galeri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Tesislerimizi <span className="gradient-text">Kesfedin</span>
          </h2>
          <p className="text-[#A0A0A0] mt-4 max-w-xl mx-auto">
            Modern ekipmanlarimiz ve ferah ortamimizla size en iyi deneyimi sunuyoruz.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF3D00] text-white'
                  : 'bg-[#151515] text-[#A0A0A0] border border-[#2A2A2A] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className="aspect-square bg-gradient-to-br from-[#FF3D00]/20 to-[#1A1A1A]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-30">📷</span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-[#FF3D00] text-sm">{item.category}</p>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-[#FF3D00] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 bg-[#151515] rounded-full flex items-center justify-center hover:bg-[#FF3D00] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-w-4xl w-full aspect-video bg-[#151515] rounded-2xl flex items-center justify-center">
              <span className="text-6xl opacity-50">📷</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
