'use client'

import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'

const days = ['Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi', 'Pazar']

const schedule = {
  Pazartesi: [
    { time: '07:00', class: 'Sabah Yogasi', trainer: 'Elif Demir', duration: '60 dk' },
    { time: '09:00', class: 'HIIT', trainer: 'Selin Yildiz', duration: '45 dk' },
    { time: '12:00', class: 'Strength Training', trainer: 'Ahmet Yilmaz', duration: '60 dk' },
    { time: '18:00', class: 'Spinning', trainer: 'Can Arslan', duration: '45 dk' },
    { time: '20:00', class: 'CrossFit', trainer: 'Mehmet Kaya', duration: '60 dk' },
  ],
  Sali: [
    { time: '07:00', class: 'Pilates', trainer: 'Elif Demir', duration: '60 dk' },
    { time: '10:00', class: 'Fonksiyonel Fitness', trainer: 'Mehmet Kaya', duration: '50 dk' },
    { time: '17:00', class: 'Agirlik Calismalari', trainer: 'Can Arslan', duration: '60 dk' },
    { time: '19:00', class: 'Cardio Blast', trainer: 'Selin Yildiz', duration: '45 dk' },
  ],
  Carsamba: [
    { time: '07:00', class: 'Sabah Yogasi', trainer: 'Elif Demir', duration: '60 dk' },
    { time: '09:00', class: 'HIIT', trainer: 'Selin Yildiz', duration: '45 dk' },
    { time: '12:00', class: 'Body Pump', trainer: 'Ahmet Yilmaz', duration: '60 dk' },
    { time: '18:00', class: 'Spinning', trainer: 'Can Arslan', duration: '45 dk' },
    { time: '20:00', class: 'CrossFit', trainer: 'Mehmet Kaya', duration: '60 dk' },
  ],
  Persembe: [
    { time: '07:00', class: 'Pilates', trainer: 'Elif Demir', duration: '60 dk' },
    { time: '10:00', class: 'Kettlebell', trainer: 'Mehmet Kaya', duration: '45 dk' },
    { time: '17:00', class: 'Vucut Gelistirme', trainer: 'Can Arslan', duration: '75 dk' },
    { time: '19:00', class: 'Tabata', trainer: 'Selin Yildiz', duration: '30 dk' },
  ],
  Cuma: [
    { time: '07:00', class: 'Flow Yoga', trainer: 'Elif Demir', duration: '60 dk' },
    { time: '09:00', class: 'Circuit Training', trainer: 'Ahmet Yilmaz', duration: '50 dk' },
    { time: '12:00', class: 'HIIT', trainer: 'Selin Yildiz', duration: '45 dk' },
    { time: '17:00', class: 'Spinning', trainer: 'Can Arslan', duration: '45 dk' },
    { time: '19:00', class: 'CrossFit Open', trainer: 'Mehmet Kaya', duration: '90 dk' },
  ],
  Cumartesi: [
    { time: '09:00', class: 'Weekend Warrior', trainer: 'Ahmet Yilmaz', duration: '90 dk' },
    { time: '11:00', class: 'Yoga & Meditasyon', trainer: 'Elif Demir', duration: '75 dk' },
    { time: '14:00', class: 'Acik Gym', trainer: '-', duration: '180 dk' },
  ],
  Pazar: [
    { time: '10:00', class: 'Recovery Yoga', trainer: 'Elif Demir', duration: '60 dk' },
    { time: '12:00', class: 'Hafif Cardio', trainer: 'Selin Yildiz', duration: '45 dk' },
  ],
}

const workingHours = [
  { day: 'Pazartesi - Cuma', hours: '06:00 - 23:00' },
  { day: 'Cumartesi', hours: '08:00 - 20:00' },
  { day: 'Pazar', hours: '09:00 - 18:00' },
]

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Pazartesi')

  return (
    <section id="schedule" className="section bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
            Ders Programi
          </span>
          <h2 className="section-title mt-2">
            Haftalik
            <span className="gradient-text"> Program</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Haftalik ders programimizi inceleyin ve size uygun seansları secin.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Schedule Table */}
          <div className="lg:col-span-3">
            {/* Day Selector */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeDay === day
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--background-card)] text-[var(--foreground-muted)] hover:text-white border border-[var(--border)]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Classes List */}
            <div className="space-y-3">
              {schedule[activeDay as keyof typeof schedule]?.map((item, index) => (
                <div
                  key={index}
                  className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[var(--accent-primary)] transition-colors"
                >
                  {/* Time */}
                  <div className="flex items-center gap-2 sm:w-24">
                    <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span className="font-semibold text-white">{item.time}</span>
                  </div>

                  {/* Class Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{item.class}</h4>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Antrenor: {item.trainer}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--foreground-muted)] bg-[var(--background-secondary)] px-3 py-1 rounded-full">
                      {item.duration}
                    </span>
                    <button className="btn-primary text-sm py-2 px-4">
                      Kayit Ol
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--accent-primary)]" />
                Calisma Saatleri
              </h3>

              <div className="space-y-4">
                {workingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-[var(--foreground-muted)]">{item.day}</span>
                    <span className="font-semibold text-white">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] mt-6 pt-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                  Konum
                </h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Ornek Mahallesi, Fitness Caddesi No: 123
                  <br />
                  Kadikoy, Istanbul
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
